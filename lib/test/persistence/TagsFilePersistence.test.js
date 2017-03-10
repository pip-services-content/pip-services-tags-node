"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var TagsFilePersistence_1 = require('../../src/persistence/TagsFilePersistence');
var TagsPersistenceFixture_1 = require('./TagsPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/tags.test.json',
        data: []
    }
});
suite('TagsFilePersistence', function () {
    var db, fixture;
    suiteSetup(function (done) {
        db = new TagsFilePersistence_1.TagsFilePersistence();
        db.configure(config);
        fixture = new TagsPersistenceFixture_1.TagsPersistenceFixture(db);
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
