"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var TagsDataConverter_1 = require('./TagsDataConverter');
var TagsFilePersistence = (function (_super) {
    __extends(TagsFilePersistence, _super);
    function TagsFilePersistence(descriptor) {
        _super.call(this, descriptor || TagsFilePersistence.Descriptor);
    }
    TagsFilePersistence.prototype.getTags = function (correlationId, partyId, callback) {
        this.getById(partyId, function (err, item) {
            var tagRecords = item ? item.tags : [];
            tagRecords = tagRecords || [];
            callback(err, tagRecords);
        });
    };
    TagsFilePersistence.prototype.setTags = function (correlationId, partyId, tagRecords, callback) {
        var _this = this;
        tagRecords = TagsDataConverter_1.TagsDataConverter.validateTags(tagRecords);
        this.getById(partyId, function (err, item) {
            if (err) {
                callback(err, null);
                return;
            }
            if (item == null) {
                item = {
                    id: partyId,
                    tags: tagRecords,
                    updated: new Date()
                };
                _this._items.push(item);
            }
            else {
                item.tags = tagRecords;
                item.updated = new Date();
            }
            _this.save(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null, tagRecords);
            });
        });
    };
    /**
     * Unique descriptor for the TagsFilePersistence component
     */
    TagsFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-tags", "file", "*");
    return TagsFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.TagsFilePersistence = TagsFilePersistence;
