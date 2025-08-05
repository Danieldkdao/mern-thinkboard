import NoteModel from "./NoteModel.js";

const updateNote = async (id: string, title: string, content: string) => {
    try {
        await NoteModel.findByIdAndUpdate(id, {$set: {title, content}});
        return {success: true, message: "Note updated successfully!"};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Error updating note."};
    }
}

export default updateNote;