"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_data_node_1 = require("pip-services-data-node");
class TagsMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
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
exports.TagsMemoryPersistence = TagsMemoryPersistence;
//# sourceMappingURL=TagsMemoryPersistence.js.map