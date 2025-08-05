import NoteModel from "./NoteModel.js";

const getNotes = async () => {
    try {
        const notes = await NoteModel.find();
        return {success: true, message: "Note retrieved successfully!", notes};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Failed to retrive notes."};
    }
}

export default getNotes;