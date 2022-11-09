import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import SignUp from './Components/SignUp'
import ContactUs from './Components/ContactUs'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/contactus' element={<ContactUs />} />

        </Routes>

 
    </BrowserRouter>





    </>
  )
}

export default App