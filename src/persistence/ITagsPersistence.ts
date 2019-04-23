import { IGetter } from 'pip-services3-data-node';
import { ISetter } from 'pip-services3-data-node';

import { PartyTagsV1 } from '../data/version1/PartyTagsV1';

export interface ITagsPersistence extends IGetter<PartyTagsV1, string>, ISetter<PartyTagsV1> {
    getOneById(correlationId: string, id: string,
        callback: (err: any, item: PartyTagsV1) => void): void;

    set(correlationId: string, item: PartyTagsV1,
        callback: (err: any, item: PartyTagsV1) => void): void;
}
