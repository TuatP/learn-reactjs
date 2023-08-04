import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';


const url = "http://localhost:8080/api/categories";


export default function AddCategory() {

  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const navigate = useNavigate();

  //add Category
  const handleAddCategory = async () => {
    try {
      const response = await axios.post(url, { name: category });
      console.log("Category đã được thêm vào:", response.data);
      navigate('/admin/category/list');
    } catch (error) {
      console.log("Lỗi khi thêm category:", error);
    }
  }
  //edit
  const handleUpdateCategory = async () => {
    try {
      await axios.put(`${url}/${id}`, {name: category});
      navigate('/admin/category/list'); 
    } catch (error) {
      console.log("Error", error);
      
    }
  }

  const handleSubmit = () => {
    if(id){
      handleUpdateCategory();
    }else{
      handleAddCategory();
    }
  }

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
  //getId and findID
  const { id } = useParams();
  const editCategory = categories.find((item) => item.categoryId === parseInt(id));

  useEffect(() => {
    if (editCategory) {
      setCategory(editCategory.name); // Set giá trị category từ editCategory
      setCategoryId(editCategory.categoryId);
    }
  }, [editCategory]);







  return (
    <div>
      <section className="row">
        <div className="col-6 offset-3 mt-4">
          <div className='handleCard'>
            <div className="card" style={{height: '500px'}}>
              <div className="card-header">
                <h2>Add new category</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="">Category ID: </label>
                  <input type="hidden" />
                  <input
                    readOnly=""
                    value={categoryId}
                    type="text"
                    className="form-control"
                    aria-describedby="categoryIdHid"
                    placeholder="Category ID:"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    value={category}
                    name="name"
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                    id="name"
                    aria-describedby="nameHid"
                    placeholder="Category Name"
                  />
                </div>
              </div>
              <div className="card-footer text-muted">
                <Link className="btn btn-danger" to="/admin/category/list">
                  List
                </Link>
                <button className="btn btn-primary ml-2" onClick={handleSubmit} style={{marginLeft: '10px'}}>
                  <i className="fas fa-save" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}