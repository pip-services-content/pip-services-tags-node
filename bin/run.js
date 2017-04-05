let TagsProcess = require('../obj/src/container/TagsProcess').TagsProcess;

try {
    new TagsProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
