import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let PartyTagsMongooseSchema = function(collection?: string) {
    collection = collection || 'tags';

    let tagSchema = new Schema({
        tag: { type: String, required: true, index: true },
        count: { type: Number, required: true, 'default': 1 },
        last_time: { type: Date, required: true, 'default': Date.now }
    });

    tagSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    let schema = new Schema(
        {
            _id: { type: String, unique: true },
            tags: { type: [tagSchema], required: false },
            change_time: { type: Date, required: true, 'default': Date.now },
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.party_id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
