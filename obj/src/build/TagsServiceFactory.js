"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const TagsMongoDbPersistence_1 = require("../persistence/TagsMongoDbPersistence");
const TagsFilePersistence_1 = require("../persistence/TagsFilePersistence");
const TagsMemoryPersistence_1 = require("../persistence/TagsMemoryPersistence");
const TagsController_1 = require("../logic/TagsController");
const TagsHttpServiceV1_1 = require("../services/version1/TagsHttpServiceV1");
const TagsSenecaServiceV1_1 = require("../services/version1/TagsSenecaServiceV1");
class TagsServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(TagsServiceFactory.MemoryPersistenceDescriptor, TagsMemoryPersistence_1.TagsMemoryPersistence);
        this.registerAsType(TagsServiceFactory.FilePersistenceDescriptor, TagsFilePersistence_1.TagsFilePersistence);
        this.registerAsType(TagsServiceFactory.MongoDbPersistenceDescriptor, TagsMongoDbPersistence_1.TagsMongoDbPersistence);
        this.registerAsType(TagsServiceFactory.ControllerDescriptor, TagsController_1.TagsController);
        this.registerAsType(TagsServiceFactory.SenecaServiceDescriptor, TagsSenecaServiceV1_1.TagsSenecaServiceV1);
        this.registerAsType(TagsServiceFactory.HttpServiceDescriptor, TagsHttpServiceV1_1.TagsHttpServiceV1);
    }
}
TagsServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-tags", "factory", "default", "default", "1.0");
TagsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tags", "persistence", "memory", "*", "1.0");
TagsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tags", "persistence", "file", "*", "1.0");
TagsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tags", "persistence", "mongodb", "*", "1.0");
TagsServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tags", "controller", "default", "*", "1.0");
TagsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tags", "service", "seneca", "*", "1.0");
TagsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tags", "service", "http", "*", "1.0");
exports.TagsServiceFactory = TagsServiceFactory;
//# sourceMappingURL=TagsServiceFactory.js.map