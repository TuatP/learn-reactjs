import React from 'react'
import "../css/contact.css"

export default function Contact() {
  return (
    <>
      <div className="container d-flex justify-content-center">
  <div className="row my-2 mx-2">
    <div className="col-md-6">
      <img
        src="https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-message-icon-design-vector-png-image_1587713.jpg"
        alt="IMG"
      />
    </div>
    <div className="col-md-6">
      <h2 className="form-title">Contact us</h2>
      <p className="justify text-muted">
        Have an enquiry or would like to give us feedback?
        <br />
        Fill out the form below to contact our team.
      </p>
      <form>
        <div className="form-group pt-2 pl-1">
          <label htmlFor="exampleInputName">Your name</label>
          <input type="text" className="form-control id" id="exampleInputName" />
        </div>
        <div className="form-group pl-1">
          <label htmlFor="exampleInputEmail1">Your email address</label>
          <input
            type="email"
            className="form-control id"
            id="exampleInputEmail1"
          />
        </div>
        <div className="form-group pl-1">
          <label htmlFor="exampleFormControlTextarea1">Your message</label>
          <textarea
            className="form-control id"
            id="exampleFormControlTextarea1"
            rows={5}
            defaultValue={""}
          />
        </div>
        <div className="row">
          <div className="col-md-3 offset-md-9">
            <button type="submit" className="btn btn-primary mt-3">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  )
}
