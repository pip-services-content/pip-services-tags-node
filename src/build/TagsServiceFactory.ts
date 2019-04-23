import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { TagsMongoDbPersistence } from '../persistence/TagsMongoDbPersistence';
import { TagsFilePersistence } from '../persistence/TagsFilePersistence';
import { TagsMemoryPersistence } from '../persistence/TagsMemoryPersistence';
import { TagsController } from '../logic/TagsController';
import { TagsHttpServiceV1 } from '../services/version1/TagsHttpServiceV1';

export class TagsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-tags", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-tags", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-tags", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-tags", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-tags", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-tags", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(TagsServiceFactory.MemoryPersistenceDescriptor, TagsMemoryPersistence);
		this.registerAsType(TagsServiceFactory.FilePersistenceDescriptor, TagsFilePersistence);
		this.registerAsType(TagsServiceFactory.MongoDbPersistenceDescriptor, TagsMongoDbPersistence);
		this.registerAsType(TagsServiceFactory.ControllerDescriptor, TagsController);
		this.registerAsType(TagsServiceFactory.HttpServiceDescriptor, TagsHttpServiceV1);
	}
	
}
