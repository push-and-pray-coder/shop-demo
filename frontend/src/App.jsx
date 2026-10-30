import { useEffect, useState } from 'react'
import axios from 'axios'
import {Routes, Route} from 'react-router'
import Navbar from './pages/navbar'

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/shop" element={<h1>Shop Page</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/cart" element={<h1>Cart Page</h1>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App;

