let TagsProcess = require('../obj/src/container/TagsProcess').TagsProcess;

try {
    new TagsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
