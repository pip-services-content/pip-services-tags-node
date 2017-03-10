let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { TagsMemoryPersistence } from '../../../src/persistence/TagsMemoryPersistence';
import { TagsController } from '../../../src/logic/TagsController';
import { TagsSenecaService } from '../../../src/services/version1/TagsSenecaService';

let TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];

suite('TagsSenecaService', ()=> {        
    let db = new TagsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new TagsController();
    ctrl.configure(new ComponentConfig());

    let service = new TagsSenecaService();
    service.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });

    test('Get and Set Tags', (done) => {
        async.series([
        // Update party tags
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'tags',
                        cmd: 'set_tags',
                        party_id: '1',
                        tags: TAGS
                    },
                    (err, tags) => {
                        assert.isNull(err);

                        assert.lengthOf(tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'tags',
                        cmd: 'get_tags',
                        party_id: '1'
                    },
                    (err, tags) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'tags',
                        cmd: 'record_tags',
                        party_id: '1',
                        tags: ['tag1', 'tag 2', 'tag_3']
                    },
                    (err, tags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(tags, 3);

                        callback(err);
                    }
                );
            },
        // Record tags second time
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'tags',
                        cmd: 'record_tags',
                        party_id: '1',
                        tags: ['TAG2', 'tag3', 'tag__4']
                    },
                    (err, tags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(tags, 4);

                        callback(err);
                    }
                );
            },
        // Get tags
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'tags',
                        cmd: 'get_tags',
                        party_id: '1'
                    },
                    (err, tags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(tags, 4);

                        callback(err);
                    });
            },
        ], done);
    });
    
});