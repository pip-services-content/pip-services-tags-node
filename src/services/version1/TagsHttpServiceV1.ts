import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class TagsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/tags');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-tags', 'controller', 'default', '*', '1.0'));
    }
}