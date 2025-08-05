import api from '../config/axios';
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa6"
import { useNavigate, useParams } from 'react-router'
import { toast } from "react-toastify";

type Response = {
    success: boolean,
    message: string,
    note: Info
}

type Info = {
    title: string,
    content: string
}

type Res = {
    success: boolean,
    message: string
}

function Editid() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [ info, setInfo ] = useState<Info>({title: "", content: ""});

    useEffect(() => {
        setPrev();
    }, []);


    async function setPrev(){
        try {
            const response = await api.get<Response>(`/getNote/${id}`, {
                withCredentials: true
            });
            if(response?.data.success){
                setInfo({
                    title: response.data.note.title,
                    content: response.data.note.content
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function updateNote(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            const response = await api.put<Res>(`/updateNote/${id}`, data, {
                withCredentials: true
            });
            if(response?.data.success){
                navigate('/');
                toast.success(response.data.message);
                return;
            }
            toast.error(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Error updating note.");
        }
    }

    async function deleteNote(){
        try {
            const response = await api.delete<Response>(`/deleteNote/${id}`, {
                withCredentials: true
            });
            if(response?.data.success){
                toast.success(response.data.message);
                navigate('/');
                return;
            }
            toast.error("Error deleting note.");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting note.");
        }
    }

    return (
        <div className="flex items-center justify-center p-5">
            <div className="w-full flex flex-col items-center justify-center gap-5">
                <div className="flex justify-between items-center w-full sm:w-[60vw] sm:max-w-200">
                    <button onClick={() => navigate('/')} className="text-white font-medium cursor-pointer flex flex-row items-center justify-center gap-3">
                        <FaArrowLeft />
                        Back to Notes
                    </button>
                    <button onClick={deleteNote} className="text-red-500 border border-red-500 flex flex-row items-center justify-center gap-3 px-3 py-2 rounded-full cursor-pointer font-bold">
                        <FaTrash className="text-red-500"/>
                        Delete Note
                    </button>
                </div>
                <div className="bg-[#222222] p-5 rounded-xl w-full flex flex-col gap-4 sm:w-[60vw] sm:max-w-200">
                    <h1 className="text-white text-2xl font-semibold">Create New Note</h1>
                    <form onSubmit={updateNote} className="flex flex-col items-start justify-center gap-2">
                        <label htmlFor="title" className="text-white">Title</label>
                        <input type="text" defaultValue={info.title} id="title" name="title" className="text-white border border-gray-400 px-3 py-1 rounded-full w-full" placeholder="Note Title"/>
                        <label htmlFor="content" className="text-white">Content</label>
                        <textarea id="content" defaultValue={info.content} name="content" className="border text-white border-gray-400 p-2 rounded-2xl w-full" rows={3} placeholder="Write your note here..."></textarea>
                        <div className="flex justify-end items-center w-full">
                            <button className="bg-green-500 flex flex-row items-center justify-center gap-3 p-3 rounded-full cursor-pointer font-bold">
                                Save Changes
                            </button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editid