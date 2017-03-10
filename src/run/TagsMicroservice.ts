import { Microservice } from 'pip-services-runtime-node';

import { TagsFactory } from '../build/TagsFactory';

/**
 * Tags microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-22
 */
export class TagsMicroservice extends Microservice {
	/**
	 * Creates instance of tags microservice.
	 */
	constructor() {
		super("pip-services-tags", TagsFactory.Instance);
	}
}
