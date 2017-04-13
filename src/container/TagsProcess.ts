import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { TagsFactory } from '../build/TagsFactory';

export class TagsProcess extends ProcessContainer {

    public constructor() {
        super("tags", "Search tags microservice");
        this._factories.add(new TagsFactory);
    }

}
