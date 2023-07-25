import React from 'react'

export default function Footer() {
  return (
    <>
    <footer
  className="text-center text-lg-start text-white"
  style={{ backgroundColor: "#1c2331" }}
>

  <section className="">
    <div className="container text-center text-md-start mt-5">
      {/* Grid row */}
      <div className="row mt-3">
        {/* Grid column */}
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          {/* Content */}
          <h6 className="text-uppercase fw-bold">FRESHER ACADEMY</h6>
          <hr
            className="mb-4 mt-0 d-inline-block mx-auto"
            style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
          />
          <p>
            Here you can use rows and columns to organize your footer content.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold">PHONE SHOP</h6>
          <hr
            className="mb-4 mt-0 d-inline-block mx-auto"
            style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
          />
          <p>
            <a href="#!" className="text-white">
              MDBootstrap
            </a>
          </p>
          <p>
            <a href="#!" className="text-white">
              MDWordPress
            </a>
          </p>
          <p>
            <a href="#!" className="text-white">
              BrandFlow
            </a>
          </p>
          <p>
            <a href="#!" className="text-white">
              Bootstrap Angular
            </a>
          </p>
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold">Useful links</h6>
          <hr
            className="mb-4 mt-0 d-inline-block mx-auto"
            style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
          />
          <p>
            <a href="#!" className="text-white">
              TuatP@fpt.com
            </a>
          </p>
          <p>
            <a href="#!" className="text-white">
              Become an Affiliate
            </a>
          </p>
          <p>
            <a href="#!" className="text-white">
              Shipping Rates
            </a>
          </p>
          <p>
            <a href="#!" className="text-white">
              Help
            </a>
          </p>
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold">Contact</h6>
          <hr
            className="mb-4 mt-0 d-inline-block mx-auto"
            style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
          />
          <p>
            <i className="fas fa-home mr-3" /> Hue City
          </p>
          <p>
            <i className="fas fa-envelope mr-3" /> TuatP@fpt.com
          </p>
          <p>
            <i className="fas fa-phone mr-3" /> 0982418932
          </p>
        </div>
        {/* Grid column */}
      </div>
      {/* Grid row */}
    </div>
  </section>
  {/* Section: Links  */}
  {/* Copyright */}
  <div
    className="text-center p-3"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
  >
    © 2020 Copyright :
    <a className="text-white" href="https://mdbootstrap.com/">
      TuatP - Fresher Academy Da Nang
    </a>
  </div>
  {/* Copyright */}
</footer>

    </>
  )
}
