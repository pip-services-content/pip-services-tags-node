var mongoose = require('mongoose'), Schema = mongoose.Schema, Mixed = Schema.Types.Mixed, TagSchema = new Schema({
    tag: { type: String, required: true, index: true },
    count: { type: Number, required: true, 'default': 1 },
    used: { type: Date, required: true, 'default': Date.now }
});
TagSchema.set('toJSON', {
    transform: function (doc, ret) {
        //ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
var TagsSchema = new Schema({
    _id: { type: String, unique: true },
    tags: { type: [TagSchema], required: false },
    updated: { type: Date, required: true, 'default': Date.now },
}, {
    collection: 'tags',
    autoIndex: true,
    strict: true
});
TagsSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.party_id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
module.exports = function (connection) {
    return connection.model('Tags', TagsSchema);
};
