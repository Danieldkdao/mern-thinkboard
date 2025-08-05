import { Routes, Route } from 'react-router'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Editid from './Pages/Editid'

function App() {

    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/create' element={<Create />}/>
            <Route path='/edit/:id' element={<Editid />}/>
        </Routes>
    )
}

export default App
