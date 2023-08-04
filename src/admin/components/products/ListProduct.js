import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ListProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Gọi API từ server khi component được mount
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/products/list");
            const data = response.data
            setProducts(data)
            console.log(data)
        } catch (error) {
            console.log('Lỗi khi lấy danh sách categories:', error);
        }
    }

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/delete/${productId}`);
            fetchProducts();
        } catch (error) {
            console.log("Lỗi khi xóa category:", error);

        }
    }
    return (
        <div>
            <section class="row">
                <div class="col mt-4">
                    <div class="card" style={{marginLeft: "280px"}}>
                        <div class="card-header">
                            <h2>List of Products</h2>
                        </div>
                        <div class="card-body">

                            <div class="row mt-2 mb-2">
                                <div class="col">
                                    <form >
                                        <div class="form-inline float-left">
                                            <label for="name">Name:</label>
                                            <input type="text" class="form-control ml-2" name="name" id="name" aria-describedby="helpId" placeholder="Name" />
                                            <button class="btn btn-outline-primary">Search</button>
                                        </div>
                                    </form>
                                    <div class="float-right">
                                        <Link className="btn btn-primary" to="/admin/product/add">
                                            Add new Product
                                        </Link>                                    </div>
                                </div>
                            </div>

                            <table class="table table-striped table-inverse" >
                                <thead class="thead-inverse">

                                    <tr>
                                        <th></th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Unit Price</th>
                                        <th>Information</th>
                                        <th>Category</th>
                                        <th></th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {products.map((product) => {
                                        return (

                                            <tr key={product.id}>
                                                <td><input type="checkbox" name="" id="" class="form-check-inline" /></td>
                                                <td><img src={`http://localhost:8080/api/products/get-image/${product.imageName}`} id="image" width="70" class="img-fluid" alt="" />{product.imageFile}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.information}</td>
                                                <td>{product.category ? product.category.name : 'N/A'}</td>
                                                <td>
                                                    <a onClick={() => deleteProduct(product.id)} class="btn btn-outline-info">Delete<i class="fas fa-info"></i></a>
                                                    <a class="btn btn-outline-warning"><i class="fas fa-edit"></i></a>
                                                    <a class="btn btn-outline-danger"><i class="fas fa-recycle"></i></a>
                                                </td>

                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    )
}
