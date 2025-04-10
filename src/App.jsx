import { Route, Routes } from 'react-router'
import './App.css'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import About from './Pages/About'
import Signup from './Pages/Signup'


function App() {

  return (
    <Routes>
      <Route index element={<Homepage />}/>
      <Route path='about' element={<About />}/>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={<Signup />}/>
    </Routes>
  )
}

export default App
