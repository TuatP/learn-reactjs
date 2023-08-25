import React, { useEffect, useState } from 'react'
import "../css/profile.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';



export default function Profile() {
    const storedData = localStorage.getItem("key");
    console.log(storedData);


    const url = "http://localhost:8080/api/customers";
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        findUsername()
    }, [])

    useEffect(() => {
        formik.setValues({
            address: "Xom 8Hue",
          email: customerData.email || "",
          phone: customerData.phone || "",
          name: customerData.name || "",
        });
      }, [customerData]);


    console.log('2', customerData);


    const formik = useFormik({
        initialValues: {
            name: customerData.name,
            phone: customerData.phone,
            email: customerData.email,
            address: "Xom 8Hue"
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please input username").min(4, "Must be 4 charaters or more"),
            email: Yup.string().required("Please input email").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"),
            address: Yup.string().required("Please input password").min(6, "Must be 4 charaters or more"),
            phone: Yup.string().required("Please input phone number").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Please enter a valid phone number")
        }),
        onSubmit: async () => {
            const response = await axios.put(`${url}/${storedData}`, formik.values)
            setCustomerData(response.data)
            Swal.fire(
                'Profile update!',
                'Success',
                'success'
              )
        }
    });

    const findUsername = async () => {
        try {
            const response = await axios.get(`${url}/${storedData}`);
            setCustomerData(response.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <>
            <div className="page-content page-container" id="page-content" style={{marginLeft: '120px', marginTop: '20px'}}>
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25">
                                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" title="true" className="img-radius" alt="User-Profile-Image" />
                                            </div>
                                            <h6 className="f-w-600">{storedData}</h6>
                                            <p></p>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                                        </div>
                                    </div>
                                    <div className="col-sm-8" >
                                        <div className="card-block">
                                            <h4 className="m-b-20 p-b-5 b-b-default f-w-600" style={{marginLeft: '120px'}}>Information</h4>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Name</p>
                                                    <input
                                                        autoComplete="off"
                                                        type="text"
                                                        className="form-control"
                                                        name='name'
                                                        id='name'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.name}                                                    />
                                                    {
                                                        formik.errors.name && (
                                                            <p className='errorMsg'>{formik.errors.name} </p>
                                                        )
                                                    }
                                                </div>

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                    <input
                                                        autoComplete="off"
                                                        type="tel"
                                                        className="form-control"
                                                        name='phone'
                                                        id='phone'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.phone}
                                                    />
                                                    {
                                                        formik.errors.phone && (
                                                            <p className='errorMsg'>{formik.errors.phone} </p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="row m-t-40">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Email</p>
                                                    <input
                                                        autoComplete="off"
                                                        type="email"
                                                        className="form-control"
                                                        name='email'
                                                        id='email'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.email}
                                                    />
                                                    {
                                                        formik.errors.email && (
                                                            <p className='errorMsg'>{formik.errors.email} </p>
                                                        )
                                                    }
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Address</p>
                                                    <input
                                                        autoComplete="off"
                                                        type="text"
                                                        className="form-control"
                                                        name='address'
                                                        id='address'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.address}
                                                    />
                                                    {
                                                        formik.errors.address && (
                                                            <p className='errorMsg'>{formik.errors.address} </p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <Button variant="primary" onClick={formik.handleSubmit} style={{marginTop: '20px'}}>Update profile</Button>{' '}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
