"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const TagRecordV1Schema_1 = require("./TagRecordV1Schema");
class PartyTagsV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('tags', new pip_services_commons_node_2.ArraySchema(new TagRecordV1Schema_1.TagRecordV1Schema()));
        this.withOptionalProperty('change_time', null); //TypeCode.DateTime);
    }
}
exports.PartyTagsV1Schema = PartyTagsV1Schema;
//# sourceMappingURL=PartyTagsV1Schema.js.map