"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var TagsMemoryPersistence_1 = require('../../../src/persistence/TagsMemoryPersistence');
var TagsController_1 = require('../../../src/logic/TagsController');
var TagsRestService_1 = require('../../../src/services/version1/TagsRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
var TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];
suite('TagsRestService', function () {
    var db = new TagsMemoryPersistence_1.TagsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new TagsController_1.TagsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new TagsRestService_1.TagsRestService();
    service.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
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
            // Set party tags
            function (callback) {
                rest.put('/tags/1', {
                    tags: TAGS
                }, function (err, req, res, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            },
            // Read and check party tags
            function (callback) {
                rest.get('/tags/1', function (err, req, res, tags) {
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
                rest.post('/tags/1', { tags: ['tag1', 'tag 2', 'tag_3'] }, function (err, req, res, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            },
            // Record tags second time
            function (callback) {
                rest.post('/tags/1?tags=TAG2,tag3,tag__4', {}, function (err, req, res, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 4);
                    callback();
                });
            },
            // Get tags
            function (callback) {
                rest.get('/tags/1', function (err, req, res, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 4);
                    callback();
                });
            },
        ], done);
    });
});
