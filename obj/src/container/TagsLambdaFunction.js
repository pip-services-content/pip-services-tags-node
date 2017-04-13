"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const TagsFactory_1 = require("../build/TagsFactory");
class TagsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("tags", "Search tags function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-tags', 'controller', 'default', '*', '*'));
        this._factories.add(new TagsFactory_1.TagsFactory());
    }
}
exports.TagsLambdaFunction = TagsLambdaFunction;
exports.handler = new TagsLambdaFunction().getHandler();
//# sourceMappingURL=TagsLambdaFunction.js.map