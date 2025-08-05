import NoteModel from "./NoteModel.js";

const getNote = async (id: string) => {
    try {
        const note = await NoteModel.findById(id);
        return {success: true, message: "Note retrieved successfully!", note};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Failed to retrieve info!"};
    }
}

export default getNote;