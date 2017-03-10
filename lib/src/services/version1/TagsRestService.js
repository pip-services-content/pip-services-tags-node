"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var TagsRestService = (function (_super) {
    __extends(TagsRestService, _super);
    function TagsRestService() {
        _super.call(this, TagsRestService.Descriptor);
    }
    TagsRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-tags", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    TagsRestService.prototype.getTags = function (req, res) {
        this._logic.getTags(req.params.correlation_id, req.params.partyId, this.sendResult(req, res));
    };
    TagsRestService.prototype.setTags = function (req, res) {
        this._logic.setTags(req.params.correlation_id, req.params.partyId, req.body.tags, this.sendResult(req, res));
    };
    TagsRestService.prototype.recordTags = function (req, res) {
        if (req.params.tags) {
            var tags = req.params.tags;
            if (_.isString(tags))
                tags = tags.split(',');
            this._logic.recordTags(req.params.correlation_id, req.params.partyId, tags, this.sendResult(req, res));
        }
        else {
            this._logic.recordTags(req.params.correlation_id, req.params.partyId, req.body.tags, this.sendResult(req, res));
        }
    };
    TagsRestService.prototype.register = function () {
        this.registerRoute('get', '/tags/:partyId', this.getTags);
        this.registerRoute('put', '/tags/:partyId', this.setTags);
        this.registerRoute('post', '/tags/:partyId', this.recordTags);
    };
    /**
     * Unique descriptor for the TagsRestService component
     */
    TagsRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-tags", "rest", "1.0");
    return TagsRestService;
}(pip_services_runtime_node_3.RestService));
exports.TagsRestService = TagsRestService;
