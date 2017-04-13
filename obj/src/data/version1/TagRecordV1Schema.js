"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class TagRecordV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('tag', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('count', pip_services_commons_node_2.TypeCode.Long);
        this.withOptionalProperty('last_time', null); //TypeCode.DateTime);
    }
}
exports.TagRecordV1Schema = TagRecordV1Schema;
//# sourceMappingURL=TagRecordV1Schema.js.map