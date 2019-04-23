import { CommandSet } from 'pip-services3-commons-node';
import { ITagsController } from './ITagsController';
export declare class TagsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ITagsController);
    private makeGetTagsCommand;
    private makeSetTagsCommand;
    private makeRecordTagsCommand;
}
