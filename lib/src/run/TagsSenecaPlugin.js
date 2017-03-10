"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var TagsMicroservice_1 = require('./TagsMicroservice');
var TagsSenecaPlugin = (function (_super) {
    __extends(TagsSenecaPlugin, _super);
    function TagsSenecaPlugin() {
        _super.call(this, 'tags', new TagsMicroservice_1.TagsMicroservice());
    }
    return TagsSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.TagsSenecaPlugin = TagsSenecaPlugin;
