let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';

import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsPersistence } from './ITagsPersistence';
import {PartyTagsMongooseSchema } from './PartyTagsMongooseSchema';

export class TagsMongoDbPersistence 
    extends IdentifiableMongoosePersistence<PartyTagsV1, string> 
    implements ITagsPersistence {

    constructor() {
        super('tags', PartyTagsMongooseSchema());
    }

    public set(correlationId: string, item: PartyTagsV1,
        callback: (err: any, item: PartyTagsV1) => void): void {
        if (item == null) {
            if (callback) callback(null, null);
            return;
        }

        item.change_time = new Date();
        super.set(correlationId, item, callback);
    }
}
