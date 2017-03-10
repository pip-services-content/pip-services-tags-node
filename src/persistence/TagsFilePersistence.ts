let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';
import { ITagsPersistence } from './ITagsPersistence';
import { TagsDataConverter } from './TagsDataConverter';

export class TagsFilePersistence extends FilePersistence implements ITagsPersistence {
	/**
	 * Unique descriptor for the TagsFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-tags", "file", "*"
	);

    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || TagsFilePersistence.Descriptor);
    }

    public getTags(correlationId: string, partyId: string, callback) {
        this.getById(partyId, (err, item) => {
            let tagRecords = item ? item.tags : [];
            tagRecords = tagRecords || [];  
            callback(err, tagRecords);
        });
    }

    public setTags(correlationId: string, partyId: string, tagRecords: any[], callback: any) {
        tagRecords = TagsDataConverter.validateTags(tagRecords);

        this.getById(partyId, (err, item) => {
            if (err) {
                callback(err, null);
                return;
            } 
            
            if (item == null) {
                item = {
                    id: partyId,
                    tags: tagRecords,
                    updated: new Date()
                };               
                this._items.push(item);
            } else {
                item.tags = tagRecords;
                item.updated = new Date();
            }
                        
            this.save((err) => {
                 if (err) callback(err);
                 else callback(null, tagRecords);
            });
        });
    }

}
