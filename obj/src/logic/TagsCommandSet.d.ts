import { CommandSet } from 'pip-services-commons-node';
import { ITagsBusinessLogic } from './ITagsBusinessLogic';
export declare class TagsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ITagsBusinessLogic);
    private makeGetTagsCommand();
    private makeSetTagsCommand();
    private makeRecordTagsCommand();
}
