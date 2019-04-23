import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { TagsMemoryPersistence } from './TagsMemoryPersistence';
import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
export declare class TagsFilePersistence extends TagsMemoryPersistence {
    protected _persister: JsonFilePersister<PartyTagsV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
