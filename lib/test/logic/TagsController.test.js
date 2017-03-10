"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var TagsMemoryPersistence_1 = require('../../src/persistence/TagsMemoryPersistence');
var TagsController_1 = require('../../src/logic/TagsController');
var TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];
suite('TagsController', function () {
    var db = new TagsMemoryPersistence_1.TagsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new TagsController_1.TagsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Get and Set Tags', function (done) {
        async.series([
            // Update party tags
            function (callback) {
                ctrl.setTags(null, '1', TAGS, function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            },
            // Read and check party tags
            function (callback) {
                ctrl.getTags(null, '1', function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            }
        ], done);
    });
    test('Record Tags', function (done) {
        async.series([
            // Record tags first time
            function (callback) {
                ctrl.recordTags(null, '1', ['tag1', 'tag 2', 'tag_3'], function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback(err);
                });
            },
            // Record tags second time
            function (callback) {
                ctrl.recordTags(null, '1', ['TAG2', 'tag3', 'tag__4'], function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 4);
                    callback(err);
                });
            },
            // Get tags
            function (callback) {
                ctrl.getTags(null, '1', function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 4);
                    callback(err);
                });
            },
        ], done);
    });
});
