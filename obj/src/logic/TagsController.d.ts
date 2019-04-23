import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { PartyTagsV1 } from '../data/version1/PartyTagsV1';
import { ITagsController } from './ITagsController';
export declare class TagsController implements IConfigurable, IReferenceable, ICommandable, ITagsController {
    private static _defaultConfig;
    private _maxTagCount;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getTags(correlationId: string, partyId: string, callback: (err: any, partyTags: PartyTagsV1) => void): void;
    setTags(correlationId: string, partyTags: PartyTagsV1, callback: (err: any, partyTags: PartyTagsV1) => void): void;
    updateTags(partyTags: PartyTagsV1, tags: string[]): PartyTagsV1;
    trimTags(partyTags: PartyTagsV1, maxLength?: number): PartyTagsV1;
    recordTags(correlationId: string, partyId: string, tags: string[], callback: (err: any, partyTags: PartyTagsV1) => void): void;
}
