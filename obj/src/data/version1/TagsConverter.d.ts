import { PartyTagsV1 } from './PartyTagsV1';
export declare class TagsDataConverter {
    static updateTags(partyTags: PartyTagsV1, tags: string[]): PartyTagsV1;
    static trimTags(partyTags: PartyTagsV1, maxLength?: number): PartyTagsV1;
}
