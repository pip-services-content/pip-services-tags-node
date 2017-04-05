import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { TagsMongoDbPersistence } from '../persistence/TagsMongoDbPersistence';
import { TagsFilePersistence } from '../persistence/TagsFilePersistence';
import { TagsMemoryPersistence } from '../persistence/TagsMemoryPersistence';
import { TagsController } from '../logic/TagsController';
import { TagsHttpServiceV1 } from '../services/version1/TagsHttpServiceV1';
import { TagsSenecaServiceV1 } from '../services/version1/TagsSenecaServiceV1'; 

export class TagsFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-tags", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-tags", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-tags", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-tags", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-tags", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-tags", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-tags", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(TagsFactory.MemoryPersistenceDescriptor, TagsMemoryPersistence);
		this.registerAsType(TagsFactory.FilePersistenceDescriptor, TagsFilePersistence);
		this.registerAsType(TagsFactory.MongoDbPersistenceDescriptor, TagsMongoDbPersistence);
		this.registerAsType(TagsFactory.ControllerDescriptor, TagsController);
		this.registerAsType(TagsFactory.SenecaServiceDescriptor, TagsSenecaServiceV1);
		this.registerAsType(TagsFactory.HttpServiceDescriptor, TagsHttpServiceV1);
	}
	
}
