"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var TagsFactory_1 = require('../build/TagsFactory');
/**
 * Tags microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-22
 */
var TagsMicroservice = (function (_super) {
    __extends(TagsMicroservice, _super);
    /**
     * Creates instance of tags microservice.
     */
    function TagsMicroservice() {
        _super.call(this, "pip-services-tags", TagsFactory_1.TagsFactory.Instance);
    }
    return TagsMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.TagsMicroservice = TagsMicroservice;
