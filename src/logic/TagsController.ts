import { DynamicMap } from 'pip-services-runtime-node';
import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';

import { ITagsPersistence } from '../persistence/ITagsPersistence';
import { TagsDataConverter } from '../persistence/TagsDataConverter';
import { TagsCommandSet } from './TagsCommandSet';

export class TagsController extends AbstractController {
	/**
	 * Unique descriptor for the TagsController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-tags", "*", "*"
	);
    
    private static DefaultConfig: DynamicMap = DynamicMap.fromTuples(
        "options.maxTagCount", 1000
    );

	private _db: ITagsPersistence;
    private _maxTagCount: number;
    
    constructor() {
        super(TagsController.Descriptor);
    }

    public configure(config: ComponentConfig) {
        super.configure(config.withDefaults(TagsController.DefaultConfig));

        this._maxTagCount = config.getOptions().getInteger('maxTagCount');
    }
    
    public link(components: ComponentSet): void {
        // Locate reference to tags persistence component
        this._db = <ITagsPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-tags", '*', '*')
    	);
        
        super.link(components);

        // Add commands
        let commands = new TagsCommandSet(this);
        this.addCommandSet(commands);
    }
    
    public getTags(correlationId: string, partyId: string, callback) {
        callback = this.instrument(correlationId, 'tags.get_tags', callback);
        this._db.getTags(correlationId, partyId, callback);
    }

    public setTags(correlationId: string, partyId: string, tagRecords: any[], callback) {
        callback = this.instrument(correlationId, 'tags.set_tags', callback);
        this._db.setTags(correlationId, partyId, tagRecords, callback);
    }

    public recordTags(correlationId: string, partyId: string, tags: string[], callback) {
        callback = this.instrument(correlationId, 'tags.record_tags', callback);

        tags = TagsProcessor.normalizeTags(tags || []);

        // If there are no tags then skip processing
        if (tags.length == 0) {
            if (callback) callback();
            return;
        }

        this.getTags(
            correlationId,
            partyId,
            (err, tagRecords) => {
                if (err) {
                    callback(err);
                    return;
                }
                
                tagRecords = TagsDataConverter.updateTags(tagRecords, tags);
                tagRecords = TagsDataConverter.trimTags(tagRecords, this._maxTagCount);
                
                this.setTags(
                    correlationId,
                    partyId, 
                    tagRecords,
                    callback
                )
            }
        );
    }
    
}
