"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const TagsMongoDbPersistence_1 = require("../persistence/TagsMongoDbPersistence");
const TagsFilePersistence_1 = require("../persistence/TagsFilePersistence");
const TagsMemoryPersistence_1 = require("../persistence/TagsMemoryPersistence");
const TagsController_1 = require("../logic/TagsController");
const TagsHttpServiceV1_1 = require("../services/version1/TagsHttpServiceV1");
const TagsSenecaServiceV1_1 = require("../services/version1/TagsSenecaServiceV1");
class TagsFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(TagsFactory.MemoryPersistenceDescriptor, TagsMemoryPersistence_1.TagsMemoryPersistence);
        this.registerAsType(TagsFactory.FilePersistenceDescriptor, TagsFilePersistence_1.TagsFilePersistence);
        this.registerAsType(TagsFactory.MongoDbPersistenceDescriptor, TagsMongoDbPersistence_1.TagsMongoDbPersistence);
        this.registerAsType(TagsFactory.ControllerDescriptor, TagsController_1.TagsController);
        this.registerAsType(TagsFactory.SenecaServiceDescriptor, TagsSenecaServiceV1_1.TagsSenecaServiceV1);
        this.registerAsType(TagsFactory.HttpServiceDescriptor, TagsHttpServiceV1_1.TagsHttpServiceV1);
    }
}
TagsFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-tags", "factory", "default", "default", "1.0");
TagsFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tags", "persistence", "memory", "*", "1.0");
TagsFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tags", "persistence", "file", "*", "1.0");
TagsFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tags", "persistence", "mongodb", "*", "1.0");
TagsFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tags", "controller", "default", "*", "1.0");
TagsFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tags", "service", "seneca", "*", "1.0");
TagsFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tags", "service", "http", "*", "1.0");
exports.TagsFactory = TagsFactory;
//# sourceMappingURL=TagsFactory.js.map