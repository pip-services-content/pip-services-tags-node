"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_data_node_1 = require("pip-services-data-node");
const PartyTagsMongoDbSchema_1 = require("./PartyTagsMongoDbSchema");
class TagsMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('tags', PartyTagsMongoDbSchema_1.PartyTagsMongoDbSchema());
    }
    set(correlationId, item, callback) {
        if (item == null) {
            if (callback)
                callback(null, null);
            return;
        }
        item.change_time = new Date();
        super.set(correlationId, item, callback);
    }
}
exports.TagsMongoDbPersistence = TagsMongoDbPersistence;
//# sourceMappingURL=TagsMongoDbPersistence.js.map