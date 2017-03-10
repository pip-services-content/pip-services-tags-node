let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';
import { ITagsPersistence } from './ITagsPersistence';
import { TagsDataConverter } from './TagsDataConverter';

export class TagsMongoDbPersistence extends MongoDbPersistence implements ITagsPersistence {    
	/**
	 * Unique descriptor for the TagsMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-tags", "mongodb", "*"
	);

    constructor() {
        super(TagsMongoDbPersistence.Descriptor, require('./TagsModel'));
    }
        
    public getTags(correlationId: string, partyId: string, callback) {
        this._model.findById(
            partyId, 
            (err, item) => {
                let tagRecords = item ? item.tags : [];
                tagRecords = _.map(tagRecords, (tag) => this.jsonToPublic(tag));
                callback(err, tagRecords);
            }
        );
    }

    public setTags(correlationId: string, partyId: string, tagRecords: any[], callback) {
        tagRecords = tagRecords || [];
        
        this._model.findByIdAndUpdate(
            partyId,
            {
                $set: {
                    tags: tagRecords,
                    updated: new Date()
                }
            },
            {
                'new': true,
                upsert: true
            },
            (err, item) => {
                let tagRecords = item ? item.tags : []; 
                tagRecords = _.map(tagRecords, (tag) => this.jsonToPublic(tag));
                callback(err, tagRecords);
            }
        );
    }

}
