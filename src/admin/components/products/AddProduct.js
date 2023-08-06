import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        quantity: "",
        discount: "",
        category: "",
        information: "",
        using: "",

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
            formData.append("quantity", productData.quantity);
            formData.append("discount", productData.discount);
            formData.append("information", productData.information);
            formData.append("using", productData.using);
            formData.append('category',
                selectedCategoryId
            ); // Đã chỉnh sửa
            formData.append("imageFile", productData.imageFile)
            console.log(formData)
            const response = await axios.post(
                "http://localhost:8080/api/products",
                formData
            );
            alert("Add product is success")
            navigate('/admin/product/list'); 
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
                        <div className="card" style={{ marginLeft: '290px', height: '900px' }}>
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
                                                readOnly="true"
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
                                        <div class="form-group">
                                            <label for="quantity">Quantity:</label>
                                            <input type="number" class="form-control" value={productData.quantity} name="quantity" onChange={handleChange} id="quantity" aria-describedby="quantityHid" placeholder="Quantity" />
                                        </div>
                                        <div className="input-group form-group mt-2">

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
                                        <div className="input-group form-group mt-2">
                                            <span className="input-group-text">Discount:</span>
                                            <input type="number" onChange={handleChange} value={productData.discount} name="discount" id="discount" class="form-control" placeholder="Discount" />
                                            <span className="input-group-text">%</span>

                                        </div>
                                    </div>
                                    <div className="col-3">

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
                                            <label htmlFor="description">Information</label>
                                            <textarea
                                                className="form-control"
                                                onChange={handleChange}
                                                value={productData.information}
                                                name="information"
                                                id="information"
                                                aria-describedby="nameHid"
                                                rows={5}
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="description">Using</label>
                                            <textarea class="form-control" onChange={handleChange} value={productData.using} name="using" id="using" aria-describedby="nameHid" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-muted">
                                <button type='submit' className="btn btn-primary" style={{marginRight: "5px"}}>
                                    Save
                                </button>
                                <Link className="btn btn-danger" to="/admin/product/list">
                                    List
                                </Link>
                            </div>
                        </div>
                    </form>

                </div>
            </section>

        </div>
    )
}
