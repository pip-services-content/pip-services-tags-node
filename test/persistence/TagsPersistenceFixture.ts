let async = require('async');
let assert = require('chai').assert;

import { ITagsPersistence } from '../../src/persistence/ITagsPersistence';
import { PartyTagsV1 } from '../../src/data/version1/PartyTagsV1';
import { TagRecordV1 } from '../../src/data/version1/TagRecordV1';

let TAGS = new PartyTagsV1(
    '1',
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);
    
export class TagsPersistenceFixture {
    private _persistence: ITagsPersistence;
    
    constructor( persistence) {
        assert.isNotNull( persistence);
        this._persistence =  persistence;
    }

    public testGetAndSetTags(done) {
        async.series([
        // Set party tags
            (callback) => {
                this._persistence.set(
                    null,
                    TAGS,
                    (err, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                this._persistence.getOneById(
                    null,
                    '1',
                    (err, partyTags) => {
                        assert.isNull(err);

                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            }
        ], done);
    }

}
