"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class TagsHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('tags');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-tags', 'controller', 'default', '*', '1.0'));
    }
}
exports.TagsHttpServiceV1 = TagsHttpServiceV1;
//# sourceMappingURL=TagsHttpServiceV1.js.map