/**
 * @file Party tags process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var _ = require('lodash');
var TagsProcessRunner = require('../lib/src/run/TagsProcessRunner').TagsProcessRunner;

var runner = new TagsProcessRunner();

runner.startWithDefaultConfig('../config/config.json');