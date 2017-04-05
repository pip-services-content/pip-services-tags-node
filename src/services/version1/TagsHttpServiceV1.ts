import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class TagsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('tags');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-tags', 'controller', 'default', '*', '1.0'));
    }
}