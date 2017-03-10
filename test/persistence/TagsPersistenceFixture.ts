let async = require('async');
let assert = require('chai').assert;

import { ITagsPersistence } from '../../src/persistence/ITagsPersistence';

let TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];
    
export class TagsPersistenceFixture {
    private _db: ITagsPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }

    testGetAndSetTags(done) {
        async.series([
        // Set party tags
            (callback) => {
                this._db.setTags(
                    null,
                    '1',
                    TAGS,
                    (err, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                this._db.getTags(
                    null,
                    '1',
                    (err, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

                        callback();
                    }
                );
            }
        ], done);
    }

}
