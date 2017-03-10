import { IPersistence } from 'pip-services-runtime-node';

export interface ITagsPersistence extends IPersistence {
    getTags(correlationId: string, partyId: string, callback: any);
    setTags(correlationId: string, partyId: string, tagRecords: any[], callback: any);
}
