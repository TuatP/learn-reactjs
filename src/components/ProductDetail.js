import React from 'react'
import "../css/detailProduct.css"
import { useParams } from 'react-router-dom'

const ProductDetail = ({ products, addProductToCart }) => {
    const { id } = useParams();
  
    // Tìm sản phẩm theo ID trong danh sách sản phẩm
    const product = products.find((item) => item.id === parseInt(id));
  
    if (!product) {
      // Xử lý trường hợp không tìm thấy sản phẩm
      return <div>Product not found.</div>;
    }
  
    return (
      <>
                <div className="card">
  <div className="container-fliud">
    <div className="wrapper row">
      <div className="preview col-md-6">
        <div className="preview-pic tab-content">
          <div className="tab-pane active" id="pic-1">
            <img src={product.image} alt='' width={100} height={500}/>
          </div>
        </div>
      </div>
      <div className="details col-md-6">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">
          {product.description}
        </p>
        <h4 className="price">
          current price: <span>{product.price}$</span>
        </h4>
        <p className="vote">
          <strong>91%</strong> of buyers enjoyed this product!{" "}
          <strong>(87 votes)</strong>
        </p>
        <h5 className="sizes">
          GB:
          <span className="size" data-toggle="tooltip" title="small">
            32
          </span>
          <span className="size" data-toggle="tooltip" title="medium">
            64
          </span>
          <span className="size" data-toggle="tooltip" title="large">
            128
          </span>
          <span className="size" data-toggle="tooltip" title="xtra large">
            256
          </span>
        </h5>
        <h5 className="colors">
          colors:
          <span
            className="color orange"
            data-toggle="tooltip"
            title="Not In store"
          />
          <span className="color green" />
          <span className="color blue" />
        </h5>
        <div className="action">
          <button className="add-to-cart btn btn-default" type="button" onClick={()=> 
									addProductToCart(product)}>
            add to cart
          </button>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col mt-4">
        <h2>USING</h2>
      </div>
      <p>
        {product.used}
      </p>
    </div>
  </div>
</div>
      </>
    );
  };
  
  export default ProductDetail;