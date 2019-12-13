"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const PartyTagsV1_1 = require("../data/version1/PartyTagsV1");
const TagRecordV1_1 = require("../data/version1/TagRecordV1");
const TagsCommandSet_1 = require("./TagsCommandSet");
class TagsController {
    constructor() {
        this._maxTagCount = 100;
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(TagsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
        this._maxTagCount = config.getAsIntegerWithDefault('options.max_tag_count', this._maxTagCount);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new TagsCommandSet_1.TagsCommandSet(this);
        return this._commandSet;
    }
    getTags(correlationId, partyId, callback) {
        this._persistence.getOneById(correlationId, partyId, (err, partyTags) => {
            if (err == null && partyTags == null)
                partyTags = new PartyTagsV1_1.PartyTagsV1(partyId, []);
            callback(err, partyTags);
        });
    }
    setTags(correlationId, partyTags, callback) {
        this._persistence.set(correlationId, partyTags, callback);
    }
    updateTags(partyTags, tags) {
        partyTags.tags = partyTags.tags || [];
        // Add or update tags, increment their count and update last used time
        _.each(tags, (tag) => {
            let tagRecord = _.find(partyTags.tags, (r) => {
                return pip_services3_commons_node_3.TagsProcessor.equalTags(r.tag, tag);
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
    trimTags(partyTags, maxLength = 1000) {
        partyTags.tags = partyTags.tags || [];
        // Limit number of tags. Remove older less used tags
        if (partyTags.tags.length > maxLength) {
            partyTags.tags = _.sortBy(partyTags.tags, (r) => -r.last_time.getTime());
            partyTags.tags = _.slice(partyTags.tags, 0, maxLength);
        }
        return partyTags;
    }
    recordTags(correlationId, partyId, tags, callback) {
        tags = pip_services3_commons_node_3.TagsProcessor.normalizeTags(tags || []);
        // If there are no tags then skip processing
        if (tags.length == 0) {
            if (callback)
                callback(null, null);
            return;
        }
        this.getTags(correlationId, partyId, (err, partyTags) => {
            if (err) {
                callback(err, null);
                return;
            }
            partyTags = partyTags || new PartyTagsV1_1.PartyTagsV1(partyId, []);
            partyTags = this.updateTags(partyTags, tags);
            partyTags = this.trimTags(partyTags, this._maxTagCount);
            this.setTags(correlationId, partyTags, callback);
        });
    }
}
exports.TagsController = TagsController;
TagsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-tags:persistence:*:*:1.0', 'options.max_tags_count', 100);
//# sourceMappingURL=TagsController.js.map