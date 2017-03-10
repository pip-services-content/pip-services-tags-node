"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var TagsMemoryPersistence_1 = require('../../../src/persistence/TagsMemoryPersistence');
var TagsController_1 = require('../../../src/logic/TagsController');
var TagsSenecaService_1 = require('../../../src/services/version1/TagsSenecaService');
var TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];
suite('TagsSenecaService', function () {
    var db = new TagsMemoryPersistence_1.TagsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new TagsController_1.TagsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new TagsSenecaService_1.TagsSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Get and Set Tags', function (done) {
        async.series([
            // Update party tags
            function (callback) {
                seneca.getSeneca().act({
                    role: 'tags',
                    cmd: 'set_tags',
                    party_id: '1',
                    tags: TAGS
                }, function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            },
            // Read and check party tags
            function (callback) {
                seneca.getSeneca().act({
                    role: 'tags',
                    cmd: 'get_tags',
                    party_id: '1'
                }, function (err, tags) {
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
                seneca.getSeneca().act({
                    role: 'tags',
                    cmd: 'record_tags',
                    party_id: '1',
                    tags: ['tag1', 'tag 2', 'tag_3']
                }, function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback(err);
                });
            },
            // Record tags second time
            function (callback) {
                seneca.getSeneca().act({
                    role: 'tags',
                    cmd: 'record_tags',
                    party_id: '1',
                    tags: ['TAG2', 'tag3', 'tag__4']
                }, function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 4);
                    callback(err);
                });
            },
            // Get tags
            function (callback) {
                seneca.getSeneca().act({
                    role: 'tags',
                    cmd: 'get_tags',
                    party_id: '1'
                }, function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 4);
                    callback(err);
                });
            },
        ], done);
    });
});
