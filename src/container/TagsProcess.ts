import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { TagsFactory } from '../build/TagsFactory';

export class TagsProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve Tags components
        references.put(TagsFactory.Descriptor, new TagsFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("tags", args, "./config/config.yaml");
    }

}
