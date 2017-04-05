import { TagsMemoryPersistence } from '../../src/persistence/TagsMemoryPersistence';
import { TagsPersistenceFixture } from './TagsPersistenceFixture';

suite('TagsMemoryPersistence', ()=> {
    let persistence: TagsMemoryPersistence;
    let fixture: TagsPersistenceFixture;
    
    setup((done) => {
        persistence = new TagsMemoryPersistence();
        fixture = new TagsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });

});