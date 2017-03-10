"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var TagsDataConverter_1 = require('../persistence/TagsDataConverter');
var TagsCommandSet_1 = require('./TagsCommandSet');
var TagsController = (function (_super) {
    __extends(TagsController, _super);
    function TagsController() {
        _super.call(this, TagsController.Descriptor);
    }
    TagsController.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaults(TagsController.DefaultConfig));
        this._maxTagCount = config.getOptions().getInteger('maxTagCount');
    };
    TagsController.prototype.link = function (components) {
        // Locate reference to tags persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_3.ComponentDescriptor(pip_services_runtime_node_2.Category.Persistence, "pip-services-tags", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new TagsCommandSet_1.TagsCommandSet(this);
        this.addCommandSet(commands);
    };
    TagsController.prototype.getTags = function (correlationId, partyId, callback) {
        callback = this.instrument(correlationId, 'tags.get_tags', callback);
        this._db.getTags(correlationId, partyId, callback);
    };
    TagsController.prototype.setTags = function (correlationId, partyId, tagRecords, callback) {
        callback = this.instrument(correlationId, 'tags.set_tags', callback);
        this._db.setTags(correlationId, partyId, tagRecords, callback);
    };
    TagsController.prototype.recordTags = function (correlationId, partyId, tags, callback) {
        var _this = this;
        callback = this.instrument(correlationId, 'tags.record_tags', callback);
        tags = pip_services_runtime_node_5.TagsProcessor.normalizeTags(tags || []);
        // If there are no tags then skip processing
        if (tags.length == 0) {
            if (callback)
                callback();
            return;
        }
        this.getTags(correlationId, partyId, function (err, tagRecords) {
            if (err) {
                callback(err);
                return;
            }
            tagRecords = TagsDataConverter_1.TagsDataConverter.updateTags(tagRecords, tags);
            tagRecords = TagsDataConverter_1.TagsDataConverter.trimTags(tagRecords, _this._maxTagCount);
            _this.setTags(correlationId, partyId, tagRecords, callback);
        });
    };
    /**
     * Unique descriptor for the TagsController component
     */
    TagsController.Descriptor = new pip_services_runtime_node_3.ComponentDescriptor(pip_services_runtime_node_2.Category.Controllers, "pip-services-tags", "*", "*");
    TagsController.DefaultConfig = pip_services_runtime_node_1.DynamicMap.fromTuples("options.maxTagCount", 1000);
    return TagsController;
}(pip_services_runtime_node_4.AbstractController));
exports.TagsController = TagsController;
