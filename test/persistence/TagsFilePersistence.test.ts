import { ConfigParams } from 'pip-services-commons-node';

import { TagsFilePersistence } from '../../src/persistence/TagsFilePersistence';
import { TagsPersistenceFixture } from './TagsPersistenceFixture';

suite('TagsFilePersistence', ()=> {
    let persistence: TagsFilePersistence;
    let fixture: TagsPersistenceFixture;
    
    setup((done) => {
        persistence = new TagsFilePersistence('./data/tags.test.json');

        fixture = new TagsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });
});