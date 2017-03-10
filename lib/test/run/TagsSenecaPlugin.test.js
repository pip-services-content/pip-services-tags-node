"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var TagsSenecaPlugin_1 = require('../../src/run/TagsSenecaPlugin');
var buildConfig = {
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
suite('TagsSenecaPlugin', function () {
    var seneca;
    var plugin = new TagsSenecaPlugin_1.TagsSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'tags',
            cmd: 'get_tags',
            party_id: '1'
        }, function (err, tags) {
            assert.isNull(err);
            assert.isArray(tags);
            done();
        });
    });
});
