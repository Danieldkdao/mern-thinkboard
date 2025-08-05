import NoteModel from "./NoteModel.js";

const deleteNote = async (id: string) => {
    try {
        await NoteModel.findByIdAndDelete(id);
        return {success: true, message: "Note deleted successfully!"};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Error deleting note."};
    }
}

export default deleteNote;