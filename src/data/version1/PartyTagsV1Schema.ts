import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { TagRecordV1Schema } from './TagRecordV1Schema';

export class PartyTagsV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('tags', new ArraySchema(new TagRecordV1Schema()));
        this.withOptionalProperty('change_time', null); //TypeCode.DateTime);
    }
}
