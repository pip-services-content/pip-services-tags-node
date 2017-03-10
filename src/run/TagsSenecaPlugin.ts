import { SenecaPlugin } from 'pip-services-runtime-node';

import { TagsMicroservice} from './TagsMicroservice';

export class TagsSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('tags', new TagsMicroservice());
    }
}