import mongoose, {Schema, Document, Model} from 'mongoose';

export interface INote extends Document {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const NoteSchema: Schema<INote> = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
}, {timestamps: true});

const NoteModel: Model<INote> = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default NoteModel;