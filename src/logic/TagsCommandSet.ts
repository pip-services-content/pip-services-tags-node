let _ = require('lodash');

import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { DateTimeConverter } from 'pip-services-commons-node';

import { PartyTagsV1Schema } from '../data/version1/PartyTagsV1Schema';
import { ITagsController } from './ITagsController';

export class TagsCommandSet extends CommandSet {
    private _logic: ITagsController;

    constructor(logic: ITagsController) {
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
			new ObjectSchema(true)
				.withRequiredProperty('party_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let partyId = args.getAsNullableString("party_id");
                this._logic.getTags(correlationId, partyId, callback);
            }
		);
	}

	private makeSetTagsCommand(): ICommand {
		return new Command(
			"set_tags",
			new ObjectSchema(true)
				.withRequiredProperty('party_tags', new PartyTagsV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let partyTags = args.get("party_tags");
				partyTags.change_time = DateTimeConverter.toNullableDateTime(partyTags.change_time);
				_.each(partyTags.tags, (t) => {
					t.last_time = DateTimeConverter.toNullableDateTime(t.last_time);
				});
                this._logic.setTags(correlationId, partyTags, callback);
            }
		);
	}

	private makeRecordTagsCommand(): ICommand {
		return new Command(
			"record_tags",
			new ObjectSchema(true)
				.withRequiredProperty('party_id', TypeCode.String)
				.withRequiredProperty('tags', new ArraySchema(TypeCode.String)),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let partyId = args.getAsNullableString("party_id");
                let tags = args.getAsArray("tags");
                this._logic.recordTags(correlationId, partyId, tags, callback);
            }
		);
	}

}