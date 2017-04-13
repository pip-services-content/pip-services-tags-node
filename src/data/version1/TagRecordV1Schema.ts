import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class TagRecordV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('tag', TypeCode.String);
        this.withRequiredProperty('count', TypeCode.Long);
        this.withOptionalProperty('last_time', null); //TypeCode.DateTime);
    }
}
