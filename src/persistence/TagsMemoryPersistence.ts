let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { TagsFilePersistence } from './TagsFilePersistence';
import { ITagsPersistence } from './ITagsPersistence';

export class TagsMemoryPersistence extends TagsFilePersistence implements ITagsPersistence {
	/**
	 * Unique descriptor for the TagsFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-tags", "memory", "*"
	);

    constructor() {
        super(TagsMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}
