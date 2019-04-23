let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PartyTagsV1 } from '../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../src/data/version1/TagRecordV1';
import { TagsMemoryPersistence } from '../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../src/logic/TagsController';

let TAGS = new PartyTagsV1(
    '1',
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);

suite('TagsController', ()=> {
    let persistence: TagsMemoryPersistence;
    let controller: TagsController;

    suiteSetup(() => {
        persistence = new TagsMemoryPersistence();
        controller = new TagsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-tags', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-tags', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });

    test('Get and Set Tags', (done) => {
        async.series([
        // Update party tags
            (callback) => {
                controller.setTags(
                    null,
                    TAGS,
                    (err, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                controller.getTags(
                    null,
                    '1',
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
                controller.recordTags(
                    null,
                    '1',
                    ['tag1', 'tag 2', 'tag_3'],
                    (err, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 3);

                        callback(err);
                    }
                );
            },
        // Record tags second time
            (callback) => {
                controller.recordTags(
                    null,
                    '1',
                    ['TAG2', 'tag3', 'tag__4'],
                    (err, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 4);

                        callback(err);
                    }
                );
            },
        // Get tags
            (callback) => {
                controller.getTags(
                    null,
                    '1',
                    (err, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 4);

                        callback(err);
                    });
            }
        ], done);

    });
    
});