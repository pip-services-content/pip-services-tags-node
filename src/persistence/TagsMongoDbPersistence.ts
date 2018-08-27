let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-mongodb-node';

import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsPersistence } from './ITagsPersistence';
import {PartyTagsMongoDbSchema } from './PartyTagsMongoDbSchema';

export class TagsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<PartyTagsV1, string> 
    implements ITagsPersistence {

    constructor() {
        super('tags', PartyTagsMongoDbSchema());
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
