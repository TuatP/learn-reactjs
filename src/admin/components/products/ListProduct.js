import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

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
            <section className="row">
                <div class="col mt-4">
                    <div className="card" style={{ marginLeft: "280px", height: "1200px" }}>
                        <div class="card-header">
                            <h2>List of Products</h2>
                        </div>
                        <div className="card-body">

                            <div className="row mt-2 mb-2">
                                <div className="col">
                                    <form >
                                        <div className="form-inline float-left">
                                            <input type="text" className="form-control ml-2" onChange={(e) => setSearch(e.target.value)} name="name" id="name" aria-describedby="helpId" placeholder="Search by name" />
                                        </div>
                                    </form>
                                    <div className="float-right">
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
                                        <th>Quantity</th>
                                        <th>Discount</th>

                                        <th>Category</th>
                                        <th></th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {products.filter((product) => {
                                        return search.toLowerCase() === ''
                                            ? product
                                            : product.name.toLowerCase().includes(search)
                                    })
                                        .map((product) => {
                                            return (

                                                <tr key={product.id}>
                                                    <td><input type="checkbox" name="" id="" class="form-check-inline" /></td>
                                                    <td><img src={`http://localhost:8080/api/products/get-image/${product.imageName}`} id="image" height="10" width="70" class="img-fluid" alt="" />{product.imageFile}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.discount}</td>
                                                    <td>{product.category ? product.category.name : 'N/A'}</td>
                                                    <td>
                                                        <a onClick={() => deleteProduct(product.id)} class="btn btn-outline-danger" href='##'>Delete<i class="fas fa-info"></i></a>
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
