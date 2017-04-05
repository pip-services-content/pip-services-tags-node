let _ = require('lodash');
let assert = require('chai').assert;

import { MicroserviceConfig } from 'pip-services-runtime-node';
import { TagsLambdaFunction } from '../../src/run/TagsLambdaFunction';

let buildConfig = MicroserviceConfig.fromValue({
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    }
});

suite('TagsLambdaFunction', ()=> {    
    let lambda = new TagsLambdaFunction();

    suiteSetup((done) => {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        // done();
    });
    
    suiteTeardown((done) => {
        lambda.stop(done);
    });
                
    test('Ping', (done) => {
        lambda.getHandler()(
            {
                cmd: 'get_tags',
                party_id: '1' 
            },
            {
                done: (err, tags) => {
                    assert.isNull(err);

                    assert.isArray(tags);

                    done();
                }
            }
        );
    });
});