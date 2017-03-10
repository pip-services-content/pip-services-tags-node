"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var TagsMongoDbPersistence_1 = require('../../src/persistence/TagsMongoDbPersistence');
var TagsPersistenceFixture_1 = require('./TagsPersistenceFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var dbOptions = pip_services_runtime_node_2.ComponentConfig.fromValue(options.getNullableMap('persistence'));
suite('TagsMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new TagsMongoDbPersistence_1.TagsMongoDbPersistence();
    db.configure(dbOptions);
    var fixture = new TagsPersistenceFixture_1.TagsPersistenceFixture(db);
    suiteSetup(function (done) {
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Get and Set Tags', function (done) {
        fixture.testGetAndSetTags(done);
    });
});
