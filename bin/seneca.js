/**
 * @file Party settings seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var TagsSenecaPlugin = require('../lib/src/run/TagsSenecaPlugin').TagsSenecaPlugin;
var plugin = new TagsSenecaPlugin();

module.exports = plugin.entry();