"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var async = require('async');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var TagsMongoDbPersistence = (function (_super) {
    __extends(TagsMongoDbPersistence, _super);
    function TagsMongoDbPersistence() {
        _super.call(this, TagsMongoDbPersistence.Descriptor, require('./TagsModel'));
    }
    TagsMongoDbPersistence.prototype.getTags = function (correlationId, partyId, callback) {
        var _this = this;
        this._model.findById(partyId, function (err, item) {
            var tagRecords = item ? item.tags : [];
            tagRecords = _.map(tagRecords, function (tag) { return _this.jsonToPublic(tag); });
            callback(err, tagRecords);
        });
    };
    TagsMongoDbPersistence.prototype.setTags = function (correlationId, partyId, tagRecords, callback) {
        var _this = this;
        tagRecords = tagRecords || [];
        this._model.findByIdAndUpdate(partyId, {
            $set: {
                tags: tagRecords,
                updated: new Date()
            }
        }, {
            'new': true,
            upsert: true
        }, function (err, item) {
            var tagRecords = item ? item.tags : [];
            tagRecords = _.map(tagRecords, function (tag) { return _this.jsonToPublic(tag); });
            callback(err, tagRecords);
        });
    };
    /**
     * Unique descriptor for the TagsMongoDbPersistence component
     */
    TagsMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-tags", "mongodb", "*");
    return TagsMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.TagsMongoDbPersistence = TagsMongoDbPersistence;
