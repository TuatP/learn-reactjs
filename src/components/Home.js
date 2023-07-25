import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({products, search, addProductToCart}) {
  return (
    <>
      <main>
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
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<p>
								{
									`${product.description.slice(0,150)} ...` 
								}
							</p>
							<span className="product-price">
								{product.price}$
							</span>
							<div className="buttons">
								<Link className="btn" to={`/products/${product.id}`}>Detail</Link>
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
