export class TagRecordV1 {
    public constructor(tag: string, count?: number) {
        this.tag = tag;
        this.count = count || 0;
        this.last_time = new Date();
    }

    public tag: string;
    public count: number;
    public last_time: Date;
}