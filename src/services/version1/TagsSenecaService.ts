let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { ITagsBusinessLogic } from '../../logic/ITagsBusinessLogic';

export class TagsSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the TagsSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-tags", "seneca", "1.0"
	);

    private _logic: ITagsBusinessLogic;

    constructor() {
        super(TagsSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <ITagsBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-tags", "*", "*")
		);

		super.link(components);		

        this.registerCommands('tags', this._logic.getCommands());
	}
}
