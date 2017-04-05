let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { PartyTagsV1 } from '../../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../../src/data/version1/TagRecordV1';
import { TagsMemoryPersistence } from '../../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../../src/logic/TagsController';
import { TagsSenecaServiceV1 } from '../../../src/services/version1/TagsSenecaServiceV1';

let TAGS = new PartyTagsV1(
    '1',
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);

suite('TagsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: TagsSenecaServiceV1;
    let persistence: TagsMemoryPersistence;
    let controller: TagsController;

    suiteSetup((done) => {
        persistence = new TagsMemoryPersistence();
        controller = new TagsController();

        service = new TagsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-tags', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-tags', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-tags', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });

    test('Get and Set Tags', (done) => {
        async.series([
        // Update party tags
            (callback) => {
                seneca.act(
                    {
                        role: 'tags',
                        cmd: 'set_tags',
                        party_tags: TAGS
                    },
                    (err, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                seneca.act(
                    {
                        role: 'tags',
                        cmd: 'get_tags',
                        party_id: '1'
                    },
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Record Tags', (done) => {
        async.series([
        // Record tags first time
            (callback) => {
                seneca.act(
                    {
                        role: 'tags',
                        cmd: 'record_tags',
                        party_id: '1',
                        tags: ['tag1', 'tag 2', 'tag_3']
                    },
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 3);

                        callback(err);
                    }
                );
            },
        // Record tags second time
            (callback) => {
                seneca.act(
                    {
                        role: 'tags',
                        cmd: 'record_tags',
                        party_id: '1',
                        tags: ['TAG2', 'tag3', 'tag__4']
                    },
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 4);

                        callback(err);
                    }
                );
            },
        // Get tags
            (callback) => {
                seneca.act(
                    {
                        role: 'tags',
                        cmd: 'get_tags',
                        party_id: '1'
                    },
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 4);

                        callback(err);
                    });
            },
        ], done);
    });
    
});