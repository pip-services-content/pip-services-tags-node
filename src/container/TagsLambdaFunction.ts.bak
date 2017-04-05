import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { TagsMicroservice } from '../run/TagsMicroservice';
import { ITagsBusinessLogic } from '../logic/ITagsBusinessLogic';

export class TagsLambdaFunction extends LambdaFunction {
    private _logic: ITagsBusinessLogic;

    constructor() {
        super(new TagsMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <ITagsBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-tags", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}