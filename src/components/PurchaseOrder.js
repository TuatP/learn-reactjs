import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {Table, Container, Nav, Navbar }from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function PurchaseOrder() {

  const [purchase, setPurchase] = useState([]);

  const username = localStorage.getItem("key");

  useEffect(() => {
    // Gọi API từ server khi component được mount
    fetchPurchase();
  }, []);



  // get all Punrchase by USERNAME
  const fetchPurchase = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orderDetails/purchase/${username}`);
      setPurchase(response.data)
      console.log(response)
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  }

  const deletePurchase = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orderDetails/delete/${id}`);
      fetchPurchase();
    } catch (error) {
      console.log("Lỗi khi xóa Purchase order:", error);

    }
  }

  return (
    <div>
         <Navbar bg="light" data-bs-theme="light" style={{height: '60px', marginTop: '20px', marginBottom: '20px'}}>
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/user/purchase">
              Completed
            </Nav.Link>
            <Nav.Link as={Link} to="/user/purchase/status">Wait Confirmation</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
         {purchase.length === 0 &&( <span className='empty-text'>Your purchase order is currenlty empty</span>)}
      <Table striped bordered hover style={{marginTop: '50', marginLeft: '60px' , width: '1200px'}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Product name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Date Buy</th>
        </tr>
      </thead>
      <tbody>
        {purchase.map((pur) =>(
          pur.order.confirm === true &&(
        <tr key={pur.id}>
          <td><img src={`http://localhost:8080/api/products/get-image/${pur.product.imageName}`} id="image" height="8" width="50" className="img-fluid" alt="" /></td>
          <td>{pur.product.name}</td>
          <td>{pur.product.price}</td>
          <td>{pur.quantity}</td>
          <td>{moment(pur.order.createDate).format('LL')}</td>
          {/* <td>
          <Button variant="danger" onClick={() => deletePurchase(pur.id)}>Delete</Button>{' '}
          </td> */}
        </tr>
          )
          ))}
      </tbody>
    </Table>

    </div>
  )
}
