import NoteModel from "./NoteModel.js";

const addNote = async (title: string, content: string) => {
    try {
        const Note = new NoteModel({
            title,
            content
        });

        await Note.save();
        return {success: true, message: "Note created successfully!"};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Failed to create note."};
    }
}

export default addNote;