import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        category: "",
        information: "",
        imageFile: null
    })

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);


    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/categories/list");
            setCategories(response.data)
        } catch (error) {
            console.log('Lỗi khi lấy danh sách categories:', error);
        }
    }
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/products/list");
            setProductData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log('Lỗi khi lấy danh sách categories:', error);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductData({ ...productData, imageFile: e.target.files[0] });
    };



    const handleAddSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("name", productData.name);
            formData.append("price", productData.price);
            formData.append('category',
                selectedCategoryId
            ); // Đã chỉnh sửa
            formData.append("information", productData.information);
            formData.append("imageFile", productData.imageFile)
            console.log(formData)
            const response = await axios.post(
                "http://localhost:8080/api/products",
                formData
            );
            console.log("Sản phẩm đã được thêm", response.data);

        } catch (error) {
            console.log("Thêm thất bại", error);
        }
    };
    return (
        <div>
            <section className="row">
                <div className="col mt-4">
                <form method='post' onSubmit={handleAddSubmit} encType="multipart/form-data">
                    <div className="card" style={{marginLeft: '290px', height: '700px'}}>
                        <div className="card-header">
                            <h2>
                                Add new Product
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-group">
                                        <label htmlFor="id">Product ID:</label>
                                        <input
                                            type="text"
                                            readOnly=""
                                            className="form-control"
                                            name="id"
                                            id="id"
                                            aria-describedby="helpId"
                                            placeholder="Product ID"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            onChange={handleChange}
                                            value={productData.name}
                                            id="name"
                                            placeholder="Name product"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="categoryId">Category</label>
                                        <select
                                            className="form-control"
                                            name="category"
                                            id="categoryId"
                                            value={selectedCategoryId}
                                            onChange={e => setSelectedCategoryId(e.target.value)}
                                        >
                                            <option value="">Select a Category</option>
                                            {categories.map(category => (
                                                <option key={category.categoryId} value={category.categoryId}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                        <div className="input-group form-group">
                                            <span className="input-group-text">Unit Price</span>
                                            <input
                                                type="number"
                                                name="price"
                                                onChange={handleChange}
                                                value={productData.price}
                                                id="price"
                                                className="form-control"
                                                placeholder="Unit Price"
                                            />
                                            <span className="input-group-text">$</span>
                                            <br />
                                        </div>

                                </div>
                                <div className="col-3">
                                    <img
                                        id="image"
                                        src=""
                                        width="90%"
                                        className="img-fluid"
                                        alt=""
                                    />
                                    <div className="form-group text-center">
                                        <button className="btn btn-primary" htmlFor="productImage">
                                            Image File
                                        </button>
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            className="form-control-file"
                                            name="imageFile"
                                            id="imageFile"
                                            placeholder="Image File"
                                            aria-describedby="productImage"
                                        />
                                    </div>
                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            className="form-control"
                                            onChange={handleChange}
                                            value={productData.information}
                                            name="using"
                                            id="using"
                                            aria-describedby="nameHid"
                                            rows={5}
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <button type='submit' className="btn btn-success">
                                Save
                            </button>

                        </div>
                    </div>
                    </form>

                </div>
            </section>

        </div>
    )
}
