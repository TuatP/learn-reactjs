import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import "../css/main.css"



export default function Home( {search, addProductToCart}) {

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
  return (
    <>
      <main className='prod'>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.filter((product) => {
						return search.toLowerCase() === ''
						 ? product
						 : product.name.toLowerCase().includes(search)
					})
					.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={`http://localhost:8080/api/products/get-image/${product.imageName}`} alt="x"
							/>
							<h4 className="product-name" style={{textAlign: 'center'}}>
								{product.name}
							</h4>
							<p>
								{
									`${product.information.slice(0,150)} ...` 
								}
							</p>
							<span className="product-price" style={{textAlign: 'center'}}>
								{product.price}$
							</span>
							<div className="buttons">
								<Link className="btn" to={`/user/products/${product.id}`}>Detail</Link>
								<button
									className="btn" 
									onClick={()=> 
									addProductToCart(product)}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
    </>
  )
}
