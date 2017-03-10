import { IBusinessLogic } from 'pip-services-runtime-node';
import { DataPage } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

export interface ITagsBusinessLogic extends IBusinessLogic {
    getTags(correlationId: string, partyId: string, callback);
    setTags(correlationId: string, partyId: string, tagRecords: any[], callback);
    recordTags(correlationId: string, partyId: string, tags: string[], callback);
}
