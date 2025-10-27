import mongoose, {Schema, InferSchemaType} from 'mongoose';

const NoteSchema = new Schema({
    title: {type: String, required: true, trim:true},
    content: {type: String, default: ''}
}, {timestamps: true});

export type NoteDoc = InferSchemaType<typeof NoteSchema>;
export const Note = mongoose.model<NoteDoc>("Note", NoteSchema);