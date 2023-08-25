import axios from 'axios';
import React, { useState, useEffect } from 'react'
import moment from "moment";
import { Button, Modal } from 'react-bootstrap';



export default function Order() {

  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  const handleClose = () => setShow(false);

  useEffect(() => {
    // Gọi API từ server khi component được mount
    fetchOrders();
  }, []);

  // get all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/list`);
      setOrders(response.data)
      console.log(response)
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  }

  //get orderDetail by order
  const selectByOrderId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orderDetails/list/${id}`);
      setOrderDetails(response.data)
      setShow(true)
      console.log(response)
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  }

  //cancel order


  return (
    <div>
      <main className="container">
        <header className="row" />
        <section className="row">
          <div className="col mt-4">
            <div className="card" style={{ marginLeft: '230px' }}>
              <div className="card-header">
                <h2>List of Orders</h2>
              </div>

              <div className="card-body">
                <table className="table table-striped table-inverse">
                  <thead className="thead-inverse">
                    <tr>
                      <th>OrderID</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Create Date</th>
                      <th>#Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      order.confirm === true && (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.customer.username}</td>
                          <td>{order.address}</td>
                          <td>{moment(order.createDate).format('LL')}</td>
                          <td>
                            <Button variant="secondary" onClick={() => selectByOrderId(order.id)}>Detail</Button>{' '}
                          </td>
                        </tr>
                      )
                    ))}


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped table-inverse">
            <thead className="thead-inverse">
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {orderDetails.map((order) => (
                <tr key={order.id}>
                  <td>{order.product.name}</td>
                  <td>{order.price}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}


            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
