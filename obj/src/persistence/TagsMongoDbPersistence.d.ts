import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsPersistence } from './ITagsPersistence';
export declare class TagsMongoDbPersistence extends IdentifiableMongoDbPersistence<PartyTagsV1, string> implements ITagsPersistence {
    constructor();
    set(correlationId: string, item: PartyTagsV1, callback: (err: any, item: PartyTagsV1) => void): void;
}
