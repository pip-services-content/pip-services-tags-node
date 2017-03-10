let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { TagsMemoryPersistence } from '../../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../../src/logic/TagsController';
import { TagsRestService } from '../../../src/services/version1/TagsRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

let TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];

suite('TagsRestService', ()=> {    
    let db = new TagsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new TagsController();
    ctrl.configure(new ComponentConfig());

    let service = new TagsRestService();
    service.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Get and Set Tags', (done) => {
        async.series([
        // Set party tags
            (callback) => {
                rest.put('/tags/1',
                    {
                        tags: TAGS
                    },
                    (err, req, res, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                rest.get('/tags/1',
                    (err, req, res, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Record Tags', (done) => {
        async.series([
        // Record tags first time
            (callback) => {
                rest.post('/tags/1',
                    { tags: ['tag1', 'tag 2', 'tag_3'] },
                    (err, req, res, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

                        callback();
                    }
                );
            },
        // Record tags second time
            (callback) => {
                rest.post('/tags/1?tags=TAG2,tag3,tag__4',
                    {},
                    (err, req, res, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 4);

                        callback();
                    }
                );
            },
        // Get tags
            (callback) => {
                rest.get('/tags/1',
                    (err, req, res, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 4);

                        callback();
                    }
                );
            },
        ], done);
    });

});