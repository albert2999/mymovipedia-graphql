import React from 'react'
import { Outlet } from 'react-router-dom' 
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";


const layout = () => {
  return (
    <div className='bg-slate-300' >
        <Navbar/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default layout