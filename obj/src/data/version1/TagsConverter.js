"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const TagRecordV1_1 = require("./TagRecordV1");
class TagsDataConverter {
    static updateTags(partyTags, tags) {
        partyTags.tags = partyTags.tags || [];
        // Add or update tags, increment their count and update last used time
        _.each(tags, (tag) => {
            let tagRecord = _.find(partyTags.tags, (r) => {
                return pip_services_commons_node_1.TagsProcessor.equalTags(r.tag, tag);
            });
            if (tagRecord != null) {
                tagRecord.tag = tag;
                tagRecord.count = tagRecord.count + 1;
                tagRecord.used = new Date();
            }
            else {
                partyTags.tags.push(new TagRecordV1_1.TagRecordV1(tag, 1));
            }
        });
        return partyTags;
    }
    static trimTags(partyTags, maxLength = 1000) {
        partyTags.tags = partyTags.tags || [];
        // Limit number of tags. Remove older less used tags
        if (partyTags.tags.length > maxLength) {
            partyTags.tags = _.sortBy(partyTags.tags, (r) => -r.last_time.getTime());
            partyTags.tags = _.slice(partyTags.tags, 0, maxLength);
        }
        return partyTags;
    }
}
exports.TagsDataConverter = TagsDataConverter;
//# sourceMappingURL=TagsConverter.js.map