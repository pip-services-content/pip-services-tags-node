import { ProcessRunner } from 'pip-services-runtime-node';
import { TagsMicroservice } from './TagsMicroservice';

/**
 * Tags process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-22
 */
export class TagsProcessRunner extends ProcessRunner {
    /**
     * Creates instance of tags process runner
     */
    constructor() {
        super(new TagsMicroservice());
    }
}