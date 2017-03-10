"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var TagsMongoDbPersistence_1 = require('../persistence/TagsMongoDbPersistence');
var TagsFilePersistence_1 = require('../persistence/TagsFilePersistence');
var TagsMemoryPersistence_1 = require('../persistence/TagsMemoryPersistence');
var TagsController_1 = require('../logic/TagsController');
var TagsRestService_1 = require('../services/version1/TagsRestService');
var TagsSenecaService_1 = require('../services/version1/TagsSenecaService');
var TagsFactory = (function (_super) {
    __extends(TagsFactory, _super);
    function TagsFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(TagsFilePersistence_1.TagsFilePersistence.Descriptor, TagsFilePersistence_1.TagsFilePersistence);
        this.register(TagsMemoryPersistence_1.TagsMemoryPersistence.Descriptor, TagsMemoryPersistence_1.TagsMemoryPersistence);
        this.register(TagsMongoDbPersistence_1.TagsMongoDbPersistence.Descriptor, TagsMongoDbPersistence_1.TagsMongoDbPersistence);
        this.register(TagsController_1.TagsController.Descriptor, TagsController_1.TagsController);
        this.register(TagsRestService_1.TagsRestService.Descriptor, TagsRestService_1.TagsRestService);
        this.register(TagsSenecaService_1.TagsSenecaService.Descriptor, TagsSenecaService_1.TagsSenecaService);
    }
    TagsFactory.Instance = new TagsFactory();
    return TagsFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.TagsFactory = TagsFactory;
