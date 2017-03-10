"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var TagsMemoryPersistence_1 = require('../../src/persistence/TagsMemoryPersistence');
var TagsPersistenceFixture_1 = require('./TagsPersistenceFixture');
suite('TagsMemoryPersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new TagsMemoryPersistence_1.TagsMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
        fixture = new TagsPersistenceFixture_1.TagsPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('Get and Set Tags', function (done) {
        fixture.testGetAndSetTags(done);
    });
});
