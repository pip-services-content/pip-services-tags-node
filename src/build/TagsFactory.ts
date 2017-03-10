import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { TagsMongoDbPersistence } from '../persistence/TagsMongoDbPersistence';
import { TagsFilePersistence } from '../persistence/TagsFilePersistence';
import { TagsMemoryPersistence } from '../persistence/TagsMemoryPersistence';
import { TagsController } from '../logic/TagsController';
import { TagsRestService } from '../services/version1/TagsRestService';
import { TagsSenecaService } from '../services/version1/TagsSenecaService'; 

export class TagsFactory extends ComponentFactory {
	public static Instance: TagsFactory = new TagsFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(TagsFilePersistence.Descriptor, TagsFilePersistence);
		this.register(TagsMemoryPersistence.Descriptor, TagsMemoryPersistence);
		this.register(TagsMongoDbPersistence.Descriptor, TagsMongoDbPersistence);
		this.register(TagsController.Descriptor, TagsController);
		this.register(TagsRestService.Descriptor, TagsRestService);
		this.register(TagsSenecaService.Descriptor, TagsSenecaService);
	}
	
}
