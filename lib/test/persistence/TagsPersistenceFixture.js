"use strict";
var async = require('async');
var assert = require('chai').assert;
var TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];
var TagsPersistenceFixture = (function () {
    function TagsPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    TagsPersistenceFixture.prototype.testGetAndSetTags = function (done) {
        var _this = this;
        async.series([
            // Set party tags
            function (callback) {
                _this._db.setTags(null, '1', TAGS, function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            },
            // Read and check party tags
            function (callback) {
                _this._db.getTags(null, '1', function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            }
        ], done);
    };
    return TagsPersistenceFixture;
}());
exports.TagsPersistenceFixture = TagsPersistenceFixture;
