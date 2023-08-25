import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
var total = 0;

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    useEffect(() => {
        // Gọi API từ server khi component được mount
        fetchProducts();
    }, [page, size]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/page?page=${page}&size=${size}`);
            const data = response.data.content;
            setProducts(data)
            total = response.data.totalPages;
            console.log(total);
            console.log(page);
        } catch (error) {
            console.log('Lỗi khi lấy danh sách categories:', error);
        }
    }


    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/delete/${productId}`);
            fetchProducts();
        } catch (error) {
            console.log("Lỗi khi xóa product:", error);

        }
    }

    let items = [];
    for (let number = 1; number <= total; number++) {
        items.push(
            <Pagination.Item key={number} onClick={() => setPage(number - 1)} disabled={page === number - 1}>
                {number}
            </Pagination.Item>
        );
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
                                                    <td><input type="checkbox" name="" id="" className="form-check-inline" /></td>
                                                    <td><img src={`http://localhost:8080/api/products/get-image/${product.imageName}`} id="image" height="10" width="70" className="img-fluid" alt="" />{product.imageFile}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.discount}</td>
                                                    <td>{product.category ? product.category.name : 'N/A'}</td>
                                                    <td>
                                                        <Link className="btn btn-outline-info" to={`/admin/product/${product.id}`}>Edit
                                                            <i className="fas fa-edit" />
                                                        </Link>
                                                        <a onClick={() => deleteProduct(product.id)} className="btn btn-outline-danger" href='##'>Delete</a>
                                                    </td>

                                                </tr>
                                            )
                                        })}

                                </tbody>
                            </table>
                            <Pagination style={{ marginLeft: '410px' }}>
                                <Pagination.First onClick={() => setPage(1)} disabled={page === 0} />
                                <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
                                {items}
                                <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === total - 1} />
                                <Pagination.Last onClick={() => setPage(total - 1)} disabled={page === total - 1} />
                            </Pagination>
                            {/* <div>
                                <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous Page</button>
                                <button onClick={() => setPage(page + 1)} disabled={page === total - 1} >Next Page</button>
                            </div> */}
                        </div>

                    </div>

                </div>
            </section>
        </div>
    )
}
