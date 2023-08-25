import React from 'react'
import Footer from '../components/Footer'
import { Outlet, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'

function HomeAdmin() {
  return (
    <div>
        <Nav />
        <h1>Home admin</h1>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default HomeAdmin