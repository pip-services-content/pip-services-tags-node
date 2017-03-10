import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { TagsFilePersistence } from '../../src/persistence/TagsFilePersistence';
import { TagsPersistenceFixture } from './TagsPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/tags.test.json',
        data: []
    }
});

suite('TagsFilePersistence', ()=> {
    let db, fixture;
    
    suiteSetup((done) => {
        db = new TagsFilePersistence();
        db.configure(config);

        fixture = new TagsPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done); 
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });

    setup((done) => {
        db.clearTestData(done);
    });
        
    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });

});