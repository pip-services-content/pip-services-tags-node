let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsPersistence } from './ITagsPersistence';

export class TagsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<PartyTagsV1, string> 
    implements ITagsPersistence {

    constructor() {
        super('tags');
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
