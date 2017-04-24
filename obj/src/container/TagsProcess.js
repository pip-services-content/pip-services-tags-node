"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const TagsServiceFactory_1 = require("../build/TagsServiceFactory");
class TagsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("tags", "Search tags microservice");
        this._factories.add(new TagsServiceFactory_1.TagsServiceFactory);
    }
}
exports.TagsProcess = TagsProcess;
//# sourceMappingURL=TagsProcess.js.map