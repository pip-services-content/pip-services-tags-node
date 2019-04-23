import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';

import { TagsMemoryPersistence } from './TagsMemoryPersistence';
import { PartyTagsV1 } from '../data/version1/PartyTagsV1';

export class TagsFilePersistence extends TagsMemoryPersistence {
	protected _persister: JsonFilePersister<PartyTagsV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<PartyTagsV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}