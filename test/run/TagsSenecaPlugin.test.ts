let _ = require('lodash');
let assert = require('chai').assert;

import { TagsSenecaPlugin } from '../../src/run/TagsSenecaPlugin';

let buildConfig = {
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
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};

suite('TagsSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new TagsSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'tags',
                cmd: 'get_tags',
                party_id: '1' 
            },
            (err, tags) => {
                assert.isNull(err);

                assert.isArray(tags);

                done();
            }
        );
    });
});