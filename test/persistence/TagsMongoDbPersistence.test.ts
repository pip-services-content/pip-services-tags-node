import { YamlConfigReader } from 'pip-services-commons-node';

import { TagsMongoDbPersistence } from '../../src/persistence/TagsMongoDbPersistence';
import { TagsPersistenceFixture } from './TagsPersistenceFixture';

suite('TagsMongoDbPersistence', ()=> {
    let persistence: TagsMongoDbPersistence;
    let fixture: TagsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new TagsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new TagsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });
});