let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';

import { ITagsBusinessLogic } from '../../logic/ITagsBusinessLogic';

export class TagsRestService extends RestService {       
	/**
	 * Unique descriptor for the TagsRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-tags", "rest", "1.0"
	);
    
	private _logic: ITagsBusinessLogic;

    constructor() {
        super(TagsRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <ITagsBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-tags", "*", "*")
		);

		super.link(components);		
	}
        
    private getTags(req, res) {
        this._logic.getTags(
            req.params.correlation_id,
            req.params.partyId,
            this.sendResult(req, res)
        );
    }

    private setTags(req, res) {
        this._logic.setTags(
            req.params.correlation_id,
            req.params.partyId,
            req.body.tags,
            this.sendResult(req, res)
        );
    }

    private recordTags(req, res) {
        if (req.params.tags) {
            let tags = req.params.tags;
            if (_.isString(tags)) 
                tags = tags.split(',');
            
            this._logic.recordTags(
                req.params.correlation_id,
                req.params.partyId,
                tags,
                this.sendResult(req, res)
            );
        } else {
            this._logic.recordTags(
                req.params.correlation_id,
                req.params.partyId,
                req.body.tags,
                this.sendResult(req, res)
            );
        }
    }
        
    protected register() {
        this.registerRoute('get', '/tags/:partyId', this.getTags);
        this.registerRoute('put', '/tags/:partyId', this.setTags);
        this.registerRoute('post', '/tags/:partyId', this.recordTags);
    }
}
