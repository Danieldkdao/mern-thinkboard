import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router'

function Navbar() {

    const navigate = useNavigate();

    return (
        <div className="border py-4 px-2 bg-[#191919]">
            <div className="flex flex-row items-center justify-between md:justify-around">
                <h1 className="font-mono text-3xl text-green-500 font-bold">ThinkBoard</h1>
                <button onClick={() => navigate('/create')} className="bg-green-500 flex flex-row items-center justify-center gap-3 p-3 rounded-full cursor-pointer">
                    <FaPlus className="text-xl" />
                    <p className="font-bold">New Note</p>
                </button>
            </div>
        </div>
    )
}

export default Navbar