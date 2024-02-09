import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSales = () => {
  const [user, setUser] = useState({ product: '', quantity: '', amount: '' });

  const config = {
    headers: {
      "Content-type": "application/json",
      "authorization": "bearer " + localStorage.getItem("token")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/addSales', {
        product: user.product,
        quantity: user.quantity,
        amount: user.amount,
      }, config);
      setUser({ product: '', quantity: '', amount: '' });
      toast.success(response.data.message);
    } catch (error) {
      console.error('There was an error in adding the sale:', error.message);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className=' m-4 fs-3 fw-bold text-center'>ADD SALES HERE</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Product" className="form-label">Product</label>
              <input type="text" className="input-bg form-control" value={user.product} onChange={(e) => setUser({ ...user, product: e.target.value })} placeholder='Product' />
            </div>
            <div className="mb-3">
              <label htmlFor="Quantity" className="form-label">Quantity</label>
              <input type="number" className="input-bg form-control" value={user.quantity} onChange={(e) => setUser({ ...user, quantity: e.target.value })} placeholder='Quantity' />
            </div>
            <div className="mb-3">
              <label htmlFor="Amount" className="form-label">Amount</label>
              <input type="number" className="input-bg form-control" value={user.amount} onChange={(e) => setUser({ ...user, amount: e.target.value })} placeholder='Amount' />
            </div>
            <div className='d-grid gap-2'>
              <button type="submit" className="btn btn-secondary ">submit</button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSales;
