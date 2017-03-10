"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var TagsDataConverter = (function () {
    function TagsDataConverter() {
    }
    TagsDataConverter.validateTags = function (tagRecords) {
        var currentTime = new Date();
        return _.map(tagRecords, function (tagRecord) {
            tagRecord = _.pick(tagRecord, 'tag', 'count', 'used');
            tagRecord.count = pip_services_runtime_node_1.Converter.toIntegerWithDefault(tagRecord.count, 1);
            tagRecord.used = pip_services_runtime_node_1.Converter.toDateWithDefault(tagRecord.used, currentTime);
            return tagRecord;
        });
    };
    TagsDataConverter.updateTags = function (tagRecords, newTags) {
        var currentTime = new Date();
        tagRecords = tagRecords || [];
        // Add or update tags, increment their count and update last used time
        _.each(newTags, function (newTag) {
            var oldTag = _.find(tagRecords, function (tag) {
                return pip_services_runtime_node_2.TagsProcessor.equalTags(tag.tag, newTag);
            });
            if (oldTag) {
                oldTag.tag = newTag;
                oldTag.count = oldTag.count + 1;
                oldTag.used = currentTime;
            }
            else {
                tagRecords.push({
                    tag: newTag,
                    count: 1,
                    used: currentTime
                });
            }
        });
        return tagRecords;
    };
    TagsDataConverter.trimTags = function (tagRecords, maxLength) {
        if (maxLength === void 0) { maxLength = 1000; }
        tagRecords = tagRecords || [];
        // Limit number of tags. Remove older less used tags
        if (tagRecords.length > maxLength) {
            tagRecords = _.sortBy(tagRecords, function (tagRecord) { return -tagRecord.used.getTime(); });
            tagRecords = _.slice(tagRecords, 0, maxLength);
        }
        return tagRecords;
    };
    return TagsDataConverter;
}());
exports.TagsDataConverter = TagsDataConverter;
