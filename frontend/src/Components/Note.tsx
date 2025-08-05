import api from "../config/axios";
import { FaEdit, FaTrash } from "react-icons/fa"
import { useNavigate } from 'react-router'
import { toast } from "react-toastify"
import useRender from "../Context/useRender";

type NoteProps = {
    title: string,
    content: string,
    date: string,
    id: string
}

type Response = {
    success: boolean,
    message: string
}

function Note(props: NoteProps) {

    const { rerender } = useRender();
    const navigate = useNavigate();

    async function updateNote(){
        navigate(`/edit/${props.id}`);
    }

    async function deleteNote(){
        const isAllow: boolean = window.confirm("Are you sure you want to delete this note?");
        if(!isAllow) return;
        try {
            const response = await api.delete<Response>(`/deleteNote/${props.id}`, {
                withCredentials: true
            });
            if(response?.data.success){
                toast.success(response.data.message);
                rerender();
                return;
            }
            toast.error("Error deleting note.");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting note.");
        }
    }

    return (
        <div className="bg-[#222222] border-t-4 border-green-500 rounded-2xl p-5 flex flex-col items-start justify-between gap-5 h-full">
            <div className="flex flex-col items-start justify-center gap-1">
                <h1 className="text-white font-bold text-xl">{props.title}</h1>
                <p className="text-gray-400">{props.content}</p>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <p className="text-gray-400">{props.date}</p>
                <div className="flex flex-row items-center justify-center gap-2">
                    <FaEdit onClick={updateNote} className="text-gray-400 cursor-pointer"/>
                    <FaTrash onClick={deleteNote} className="text-red-600 cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export default Note