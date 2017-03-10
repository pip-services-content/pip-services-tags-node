let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { TagsMemoryPersistence } from '../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../src/logic/TagsController';

let TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];

suite('TagsController', ()=> {        
    let db = new TagsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new TagsController();
    ctrl.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });

    test('Get and Set Tags', (done) => {
        async.series([
        // Update party tags
            (callback) => {
                ctrl.setTags(
                    null,
                    '1',
                    TAGS,
                    (err, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                ctrl.getTags(
                    null,
                    '1',
                    (err, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

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
                ctrl.recordTags(
                    null,
                    '1',
                    ['tag1', 'tag 2', 'tag_3'],
                    (err, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

                        callback(err);
                    }
                );
            },
        // Record tags second time
            (callback) => {
                ctrl.recordTags(
                    null,
                    '1',
                    ['TAG2', 'tag3', 'tag__4'],
                    (err, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 4);

                        callback(err);
                    }
                );
            },
        // Get tags
            (callback) => {
                ctrl.getTags(
                    null,
                    '1',
                    (err, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 4);

                        callback(err);
                    });
            },
        ], done);

    });
    
});