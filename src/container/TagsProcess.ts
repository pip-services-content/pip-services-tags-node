import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { TagsServiceFactory } from '../build/TagsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class TagsProcess extends ProcessContainer {

    public constructor() {
        super("tags", "Search tags microservice");
        this._factories.add(new TagsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
