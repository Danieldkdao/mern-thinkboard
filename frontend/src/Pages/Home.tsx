import { useState, useEffect } from "react"
import Navbar from "../Components/Navbar"
import Note from "../Components/Note"
import { FaBook } from "react-icons/fa"
import { useNavigate } from 'react-router'
import api from '../config/axios';
import useRender from "../Context/useRender"

type Note = {
    title: string,
    content: string,
    _id: string,
    createdAt: Date
}

type Response = {
    success: boolean;
    message: string;
    notes: Note[]
}

function Home() {

    const { render } = useRender();
    const navigate = useNavigate();
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        async function wait(){
            await fetchNotes();
            setLoading(false);
        }
        
        wait();
    }, [render]);

    async function fetchNotes() {
        try {
            const response = await api.get<Response>("/getNotes", {
                withCredentials: true
            });
            if(response?.data.success){
                setNotes(response.data.notes);
                return;
            }
            console.log("error");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <header className="w-full">
                <Navbar />
            </header>
            {loading ? <p className="text-green-500">Loading notes...</p> : (notes.length !== 0 ? <main className="w-full max-w-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 gap-5">
                {notes.map((item) => {
                    return <Note key={item._id} id={item._id} title={item.title} content={item.content} date={new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}/>
                })}
            </main> : <div className="flex flex-col items-center justify-center gap-20">
                <div className="flex flex-col items-center justify-center gap-5">
                    <FaBook className="text-green-500 text-3xl"/>
                    <h1 className="text-white font-medium text-xl">No notes yet</h1>
                    <p className="text-gray-400 max-w-100 text-center">Ready to organize your thoughts? Create your first note to get started on your journey.</p>
                    <button onClick={() => navigate('/create')} className="bg-green-500 flex flex-row items-center justify-center gap-3 p-3 rounded-full cursor-pointer font-bold">
                        Create Your First Note
                    </button>
                </div>
            </div>)}
        </div>
    )
}

export default Home