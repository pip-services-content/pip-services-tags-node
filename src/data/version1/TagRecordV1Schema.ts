import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class TagRecordV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('tag', TypeCode.String);
        this.withRequiredProperty('count', TypeCode.Long);
        this.withOptionalProperty('last_time', null); //TypeCode.DateTime);
    }
}
