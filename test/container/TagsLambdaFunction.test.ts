let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { PartyTagsV1 } from '../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../src/data/version1/TagRecordV1';
import { TagsMemoryPersistence } from '../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../src/logic/TagsController';
import { TagsLambdaFunction } from '../../src/container/TagsLambdaFunction';

let TAGS = new PartyTagsV1(
    '1',
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);


suite('TagsLambdaFunction', ()=> {
    let lambda: TagsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-tags:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-tags:controller:default:default:1.0'
        );

        lambda = new TagsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Record Tags', (done) => {
        async.series([
        // Record tags first time
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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