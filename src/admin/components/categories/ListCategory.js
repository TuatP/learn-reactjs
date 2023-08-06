import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const url = "http://localhost:8080/api/categories";

export default function ListCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Gọi API từ server khi component được mount
    fetchCategories();
  }, []);

  // get all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/list`);
      setCategories(response.data)
      console.log(response)
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  }

  //delete category
  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${url}/delete/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.log("Lỗi khi xóa category:", error);

    }
  }

  return (
    <div>
      <main className="container">
        <header className="row" />
        <section className="row">
          <div className="col mt-4">
            <div className="card">
              <div className="card-header">
                <h2>List of Categories</h2>
              </div>
              <div className="float-right mt-3">
                <Link className="btn btn-primary" to="/admin/category/add">
                  Add new Category
                </Link>
              </div>
              <div className="card-body">
                <table className="table table-striped table-inverse">
                  <thead className="thead-inverse">
                    <tr>
                      <th>Catory ID</th>
                      <th>Name</th>
                      <th> </th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.categoryId}>
                        <td>{category.categoryId}</td>
                        <td>{category.name}</td>
                        <td>
                          <Link className="btn btn-outline-info" to={`/admin/category/${category.categoryId}`}>Edit
                            <i className="fas fa-edit" />
                          </Link>
                          <a className="btn btn-outline-danger" href='##' style={{ marginLeft: "5px" }} onClick={() => deleteCategory(category.categoryId)}>Delete
                            <i className="fas fa-recycle" />
                          </a>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <footer className="row" />
      </main>

    </div>
  )
}
