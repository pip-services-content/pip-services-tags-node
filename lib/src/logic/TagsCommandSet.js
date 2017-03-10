"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var TagsCommandSet = (function (_super) {
    __extends(TagsCommandSet, _super);
    function TagsCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetTagsCommand());
        this.addCommand(this.makeSetTagsCommand());
        this.addCommand(this.makeRecordTagsCommand());
    }
    TagsCommandSet.prototype.makeGetTagsCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_tags", new pip_services_runtime_node_3.Schema()
            .withProperty("party_id", "string"), function (correlationId, args, callback) {
            var partyId = args.getNullableString("party_id");
            _this._logic.getTags(correlationId, partyId, callback);
        });
    };
    TagsCommandSet.prototype.makeSetTagsCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "set_tags", new pip_services_runtime_node_3.Schema()
            .withProperty("party_id", "string")
            .withProperty("tags", "array"), function (correlationId, args, callback) {
            var partyId = args.getNullableString("party_id");
            var tagRecords = args.getArray("tags");
            _this._logic.setTags(correlationId, partyId, tagRecords, callback);
        });
    };
    TagsCommandSet.prototype.makeRecordTagsCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "record_tags", new pip_services_runtime_node_3.Schema()
            .withProperty("party_id", "string")
            .withProperty("tags", "array"), function (correlationId, args, callback) {
            var partyId = args.getNullableString("party_id");
            var tags = args.getArray("tags");
            _this._logic.recordTags(correlationId, partyId, tags, callback);
        });
    };
    return TagsCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.TagsCommandSet = TagsCommandSet;
