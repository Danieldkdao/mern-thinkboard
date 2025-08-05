import axios from 'axios';
import React from 'react'
import { FaArrowLeft } from "react-icons/fa6"
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';

type Response = {
    success: boolean,
    message: string
}

function Create() {

    const navigate = useNavigate();

    async function submitNote(e: React.MouseEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            const response = await axios.post<Response>("http://localhost:3000/addNote", data, {
                withCredentials: true
            });

            if(response?.data.success){
                toast.success(response.data.message);
                navigate('/');
                return;
            }
            toast.error("Error creating note.");
        } catch (error) {
            console.error(error);
            toast.error("Error creating note.");
        }
    }

  return (
    <div className="flex items-center justify-center p-5">
        <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex justify-start items-center w-full sm:w-[60vw] sm:max-w-200">
                <button onClick={() => navigate('/')} className="text-white font-medium cursor-pointer flex flex-row items-center justify-center gap-3">
                    <FaArrowLeft />
                    Back to Notes
                </button>
            </div>
            <div className="bg-[#222222] p-5 rounded-xl w-full flex flex-col gap-4 sm:w-[60vw] sm:max-w-200">
                <h1 className="text-white text-2xl font-semibold">Create New Note</h1>
                <form onSubmit={submitNote} className="flex flex-col items-start justify-center gap-2">
                    <label htmlFor="title" className="text-white">Title</label>
                    <input type="text" id="title" name="title" className="text-white border border-gray-400 px-3 py-1 rounded-full w-full" placeholder="Note Title"/>
                    <label htmlFor="content" className="text-white">Content</label>
                    <textarea id="content" name="content" className="border text-white border-gray-400 p-2 rounded-2xl w-full" rows={3} placeholder="Write your note here..."></textarea>
                    <div className="flex justify-end items-center w-full">
                        <button className="bg-green-500 flex flex-row items-center justify-center gap-3 p-3 rounded-full cursor-pointer font-bold">
                            Create Note
                        </button>
                    </div> 
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create