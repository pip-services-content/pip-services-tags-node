import { IStringIdentifiable } from 'pip-services-commons-node';
import { IChangeable } from 'pip-services-commons-node';

import { TagRecordV1 } from './TagRecordV1';

export class PartyTagsV1 implements IStringIdentifiable {
    public constructor(id: string, tags: TagRecordV1[]) {
        this.id = id;
        this.tags = tags || [];
        this.change_time = new Date();
    }

    public id: string;
    public tags: TagRecordV1[];
    public change_time: Date;
}