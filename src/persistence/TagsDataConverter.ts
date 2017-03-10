let _ = require('lodash');

import { Converter } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';

export class TagsDataConverter {

    public static validateTags(tagRecords: any[]) {
        let currentTime = new Date();
        
        return _.map(tagRecords, (tagRecord) => {
            tagRecord = _.pick(tagRecord, 'tag', 'count', 'used');
            tagRecord.count = Converter.toIntegerWithDefault(tagRecord.count, 1);
            tagRecord.used = Converter.toDateWithDefault(tagRecord.used, currentTime);
            return tagRecord;
        });
    }

    public static updateTags(tagRecords: any[], newTags: string[]) {
        let currentTime = new Date();
        tagRecords = tagRecords || [];

        // Add or update tags, increment their count and update last used time
        _.each(newTags, (newTag) => {
            let oldTag = _.find(tagRecords, (tag) => {
                return TagsProcessor.equalTags(tag.tag, newTag);
            });

            if (oldTag) {
                oldTag.tag = newTag;
                oldTag.count = oldTag.count + 1;
                oldTag.used = currentTime;
            } else {
                tagRecords.push({
                    tag: newTag,
                    count: 1,
                    used: currentTime
                });
            }
        });
        
        return tagRecords;
    }

    public static trimTags(tagRecords: any[], maxLength: number = 1000) {
        tagRecords = tagRecords || [];

        // Limit number of tags. Remove older less used tags
        if (tagRecords.length > maxLength) {
            tagRecords = _.sortBy(tagRecords, (tagRecord) => -tagRecord.used.getTime());
            tagRecords = _.slice(tagRecords, 0, maxLength);
        }
        
        return tagRecords;
    }

}
