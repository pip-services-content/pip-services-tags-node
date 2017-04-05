import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { ITagsBusinessLogic } from './ITagsBusinessLogic';

export class TagsCommandSet extends CommandSet {
    private _logic: ITagsBusinessLogic;

    constructor(logic: ITagsBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetTagsCommand());
		this.addCommand(this.makeSetTagsCommand());
		this.addCommand(this.makeRecordTagsCommand());
    }

	private makeGetTagsCommand(): ICommand {
		return new Command(
			"get_tags",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let partyId = args.getAsNullableString("party_id");
                this._logic.getTags(correlationId, partyId, callback);
            }
		);
	}

	private makeSetTagsCommand(): ICommand {
		return new Command(
			"set_tags",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let partyTags = args.get("party_tags");
                this._logic.setTags(correlationId, partyTags, callback);
            }
		);
	}

	private makeRecordTagsCommand(): ICommand {
		return new Command(
			"record_tags",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let partyId = args.getAsNullableString("party_id");
                let tags = args.getAsArray("tags");
                this._logic.recordTags(correlationId, partyId, tags, callback);
            }
		);
	}

}