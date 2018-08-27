let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { PartyTagsV1 } from '../../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../../src/data/version1/TagRecordV1';
import { TagsMemoryPersistence } from '../../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../../src/logic/TagsController';
import { TagsHttpServiceV1 } from '../../../src/services/version1/TagsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let TAGS = new PartyTagsV1(
    '1',
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);

suite('TagsHttpServiceV1', ()=> {
    let persistence: TagsMemoryPersistence;
    let service: TagsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        persistence = new TagsMemoryPersistence();
        let controller = new TagsController();

        service = new TagsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-tags', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-tags', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-tags', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup((done) => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
        persistence.clear(null, done);
    });
    
    test('Get and Set Tags', (done) => {
        async.series([
        // Set party tags
            (callback) => {
                rest.post('/v1/tags/set_tags',
                    {
                        party_tags: TAGS
                    },
                    (err, req, res, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                rest.post('/v1/tags/get_tags',
                    {
                        party_id: '1'
                    },
                    (err, req, res, partyTags) => {
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
                rest.post('/v1/tags/record_tags',
                    { 
                        party_id: '1',
                        tags: ['tag1', 'tag 2', 'tag_3'] 
                    },
                    (err, req, res, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            },
        // Record tags second time
            (callback) => {
                rest.post('/v1/tags/record_tags',
                    { 
                        party_id: '1',
                        tags: ['TAG2', 'tag3', 'tag__4'] 
                    },
                    (err, req, res, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 4);

                        callback();
                    }
                );
            },
        // Get tags
            (callback) => {
                rest.post('/v1/tags/get_tags',
                    {
                        party_id: '1'
                    },
                    (err, req, res, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 4);

                        callback();
                    }
                );
            },
        ], done);
    });

});