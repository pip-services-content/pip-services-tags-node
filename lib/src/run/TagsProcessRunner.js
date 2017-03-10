"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var TagsMicroservice_1 = require('./TagsMicroservice');
/**
 * Tags process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-22
 */
var TagsProcessRunner = (function (_super) {
    __extends(TagsProcessRunner, _super);
    /**
     * Creates instance of tags process runner
     */
    function TagsProcessRunner() {
        _super.call(this, new TagsMicroservice_1.TagsMicroservice());
    }
    return TagsProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.TagsProcessRunner = TagsProcessRunner;
