"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const TagsServiceFactory_1 = require("../build/TagsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class TagsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("tags", "Search tags microservice");
        this._factories.add(new TagsServiceFactory_1.TagsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.TagsProcess = TagsProcess;
//# sourceMappingURL=TagsProcess.js.map