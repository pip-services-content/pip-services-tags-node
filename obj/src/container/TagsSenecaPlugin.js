"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const TagsMemoryPersistence_1 = require("../persistence/TagsMemoryPersistence");
const TagsFilePersistence_1 = require("../persistence/TagsFilePersistence");
const TagsMongoDbPersistence_1 = require("../persistence/TagsMongoDbPersistence");
const TagsController_1 = require("../logic/TagsController");
const TagsSenecaServiceV1_1 = require("../services/version1/TagsSenecaServiceV1");
class TagsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-tags', seneca, TagsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new TagsController_1.TagsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new TagsMongoDbPersistence_1.TagsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new TagsFilePersistence_1.TagsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new TagsMemoryPersistence_1.TagsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new TagsSenecaServiceV1_1.TagsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-tags', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-tags', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-tags', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.TagsSenecaPlugin = TagsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new TagsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=TagsSenecaPlugin.js.map