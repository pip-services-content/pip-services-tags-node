"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const TagsServiceFactory_1 = require("../build/TagsServiceFactory");
class TagsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("tags", "Search tags function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-tags', 'controller', 'default', '*', '*'));
        this._factories.add(new TagsServiceFactory_1.TagsServiceFactory());
    }
}
exports.TagsLambdaFunction = TagsLambdaFunction;
exports.handler = new TagsLambdaFunction().getHandler();
//# sourceMappingURL=TagsLambdaFunction.js.map