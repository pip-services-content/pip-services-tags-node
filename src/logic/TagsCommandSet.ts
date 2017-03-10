import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

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
			this._logic,
			"get_tags",
			new Schema()
				.withProperty("party_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let partyId = args.getNullableString("party_id");
                this._logic.getTags(correlationId, partyId, callback);
            }
		);
	}

	private makeSetTagsCommand(): ICommand {
		return new Command(
			this._logic,
			"set_tags",
			new Schema()
				.withProperty("party_id", "string")
				.withProperty("tags", "array"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let partyId = args.getNullableString("party_id");
                let tagRecords = args.getArray("tags");
                this._logic.setTags(correlationId, partyId, tagRecords, callback);
            }
		);
	}

	private makeRecordTagsCommand(): ICommand {
		return new Command(
			this._logic,
			"record_tags",
			new Schema()
				.withProperty("party_id", "string")
				.withProperty("tags", "array"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let partyId = args.getNullableString("party_id");
                let tags = args.getArray("tags");
                this._logic.recordTags(correlationId, partyId, tags, callback);
            }
		);
	}

}