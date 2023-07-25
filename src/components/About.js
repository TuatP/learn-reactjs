import React from 'react'
import '../css/about.css';
import { FaArrowCircleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom'




export default function About() {
  return (
    <>
    <section className="carousel">
  <div className="carousel__content">
    <p>WELCOME TO SMARTPHONE SHOP</p>
    <h1>
      SMART WEB
      <br />
      DESIGN AGENCY{" "}
    </h1>
    <Link to={"/"}><button>READ MORE</button></Link>
    <div className="carousel__scroll">
      <FaArrowCircleDown size={20} className='down'/>
    </div>
  </div>
</section>

    </>
  )
}
