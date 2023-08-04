import React from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

export default function HomeUser() {
  return (
    <div>
        <Nav 	/>
        <Outlet/>
        <Footer />
    </div>
  )
}
