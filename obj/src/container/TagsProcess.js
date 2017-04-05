"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const TagsFactory_1 = require("../build/TagsFactory");
class TagsProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve Tags components
        references.put(TagsFactory_1.TagsFactory.Descriptor, new TagsFactory_1.TagsFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("tags", args, "./config/config.yaml");
    }
}
exports.TagsProcess = TagsProcess;
//# sourceMappingURL=TagsProcess.js.map