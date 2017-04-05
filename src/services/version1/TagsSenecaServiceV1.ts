import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class TagsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('tags');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-tags', 'controller', 'default', '*', '1.0'));
    }
}