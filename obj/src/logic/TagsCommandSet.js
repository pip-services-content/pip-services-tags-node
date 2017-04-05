"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class TagsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetTagsCommand());
        this.addCommand(this.makeSetTagsCommand());
        this.addCommand(this.makeRecordTagsCommand());
    }
    makeGetTagsCommand() {
        return new pip_services_commons_node_2.Command("get_tags", null, (correlationId, args, callback) => {
            let partyId = args.getAsNullableString("party_id");
            this._logic.getTags(correlationId, partyId, callback);
        });
    }
    makeSetTagsCommand() {
        return new pip_services_commons_node_2.Command("set_tags", null, (correlationId, args, callback) => {
            let partyTags = args.get("party_tags");
            this._logic.setTags(correlationId, partyTags, callback);
        });
    }
    makeRecordTagsCommand() {
        return new pip_services_commons_node_2.Command("record_tags", null, (correlationId, args, callback) => {
            let partyId = args.getAsNullableString("party_id");
            let tags = args.getAsArray("tags");
            this._logic.recordTags(correlationId, partyId, tags, callback);
        });
    }
}
exports.TagsCommandSet = TagsCommandSet;
//# sourceMappingURL=TagsCommandSet.js.map