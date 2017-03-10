import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { TagsMemoryPersistence } from '../../src/persistence/TagsMemoryPersistence';
import { TagsPersistenceFixture } from './TagsPersistenceFixture';

suite('TagsMemoryPersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new TagsMemoryPersistence();
        db.configure(new ComponentConfig());

        fixture = new TagsPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });

});