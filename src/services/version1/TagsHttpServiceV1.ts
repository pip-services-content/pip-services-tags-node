import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class TagsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/tags');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-tags', 'controller', 'default', '*', '1.0'));
    }
}