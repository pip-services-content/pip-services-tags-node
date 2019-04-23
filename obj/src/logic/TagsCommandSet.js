"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const PartyTagsV1Schema_1 = require("../data/version1/PartyTagsV1Schema");
class TagsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetTagsCommand());
        this.addCommand(this.makeSetTagsCommand());
        this.addCommand(this.makeRecordTagsCommand());
    }
    makeGetTagsCommand() {
        return new pip_services3_commons_node_2.Command("get_tags", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('party_id', pip_services3_commons_node_5.TypeCode.String), (correlationId, args, callback) => {
            let partyId = args.getAsNullableString("party_id");
            this._logic.getTags(correlationId, partyId, callback);
        });
    }
    makeSetTagsCommand() {
        return new pip_services3_commons_node_2.Command("set_tags", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('party_tags', new PartyTagsV1Schema_1.PartyTagsV1Schema()), (correlationId, args, callback) => {
            let partyTags = args.get("party_tags");
            partyTags.change_time = pip_services3_commons_node_6.DateTimeConverter.toNullableDateTime(partyTags.change_time);
            _.each(partyTags.tags, (t) => {
                t.last_time = pip_services3_commons_node_6.DateTimeConverter.toNullableDateTime(t.last_time);
            });
            this._logic.setTags(correlationId, partyTags, callback);
        });
    }
    makeRecordTagsCommand() {
        return new pip_services3_commons_node_2.Command("record_tags", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('party_id', pip_services3_commons_node_5.TypeCode.String)
            .withRequiredProperty('tags', new pip_services3_commons_node_4.ArraySchema(pip_services3_commons_node_5.TypeCode.String)), (correlationId, args, callback) => {
            let partyId = args.getAsNullableString("party_id");
            let tags = args.getAsArray("tags");
            this._logic.recordTags(correlationId, partyId, tags, callback);
        });
    }
}
exports.TagsCommandSet = TagsCommandSet;
//# sourceMappingURL=TagsCommandSet.js.map