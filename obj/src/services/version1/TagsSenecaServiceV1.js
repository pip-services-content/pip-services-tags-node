"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class TagsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('tags');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-tags', 'controller', 'default', '*', '1.0'));
    }
}
exports.TagsSenecaServiceV1 = TagsSenecaServiceV1;
//# sourceMappingURL=TagsSenecaServiceV1.js.map