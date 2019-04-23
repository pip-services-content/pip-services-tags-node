let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { TagsProcessor } from 'pip-services3-commons-node';

import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { TagRecordV1 } from '../data/version1/TagRecordV1';
import { ITagsPersistence } from '../persistence/ITagsPersistence';
import { ITagsController } from './ITagsController';
import { TagsCommandSet } from './TagsCommandSet';

export class TagsController implements IConfigurable, IReferenceable, ICommandable, ITagsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-tags:persistence:*:*:1.0',
        'options.max_tags_count', 100
    );

    private _maxTagCount: number = 100;
    private _dependencyResolver: DependencyResolver = new DependencyResolver(TagsController._defaultConfig);
    private _persistence: ITagsPersistence;
    private _commandSet: TagsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
        this._maxTagCount = config.getAsIntegerWithDefault('options.max_tag_count', this._maxTagCount);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ITagsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new TagsCommandSet(this);
        return this._commandSet;
    }
    
    public getTags(correlationId: string, partyId: string,
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        this._persistence.getOneById(correlationId, partyId, (err, partyTags) => {
            if (err == null && partyTags == null)
                partyTags = new PartyTagsV1(partyId, []);
            callback(err, partyTags);
        });
    }

    public setTags(correlationId: string, partyTags: PartyTagsV1,
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        this._persistence.set(correlationId, partyTags, callback);
    }

    public updateTags(partyTags: PartyTagsV1, tags: string[]): PartyTagsV1 {
        partyTags.tags = partyTags.tags || [];

        // Add or update tags, increment their count and update last used time
        _.each(tags, (tag) => {
            let tagRecord = _.find(partyTags.tags, (r) => {
                return TagsProcessor.equalTags(r.tag, tag);
            });

            if (tagRecord != null) {
                tagRecord.tag = tag;
                tagRecord.count = tagRecord.count + 1;
                tagRecord.used = new Date();
            } else {
                partyTags.tags.push(new TagRecordV1(tag, 1));
            }
        });
        
        return partyTags;
    }

    public trimTags(partyTags: PartyTagsV1, maxLength: number = 1000): PartyTagsV1 {
        partyTags.tags = partyTags.tags || [];

        // Limit number of tags. Remove older less used tags
        if (partyTags.tags.length > maxLength) {
            partyTags.tags = _.sortBy(partyTags.tags, (r) => -r.last_time.getTime());
            partyTags.tags = _.slice(partyTags.tags, 0, maxLength);
        }
        
        return partyTags;
    }

    public recordTags(correlationId: string, partyId: string, tags: string[],
        callback: (err: any, partyTags: PartyTagsV1) => void): void {

        tags = TagsProcessor.normalizeTags(tags || []);

        // If there are no tags then skip processing
        if (tags.length == 0) {
            if (callback) callback(null, null);
            return;
        }

        this.getTags(
            correlationId,
            partyId,
            (err, partyTags) => {
                if (err) {
                    callback(err, null);
                    return;
                }

                partyTags = partyTags || new PartyTagsV1(partyId, []);
                
                partyTags = this.updateTags(partyTags, tags);
                partyTags = this.trimTags(partyTags, this._maxTagCount);
                
                this.setTags(correlationId, partyTags, callback);
            }
        );
    }

}
