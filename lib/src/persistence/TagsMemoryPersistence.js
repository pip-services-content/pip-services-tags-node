"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var TagsFilePersistence_1 = require('./TagsFilePersistence');
var TagsMemoryPersistence = (function (_super) {
    __extends(TagsMemoryPersistence, _super);
    function TagsMemoryPersistence() {
        _super.call(this, TagsMemoryPersistence.Descriptor);
    }
    TagsMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    TagsMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the TagsFilePersistence component
     */
    TagsMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-tags", "memory", "*");
    return TagsMemoryPersistence;
}(TagsFilePersistence_1.TagsFilePersistence));
exports.TagsMemoryPersistence = TagsMemoryPersistence;
