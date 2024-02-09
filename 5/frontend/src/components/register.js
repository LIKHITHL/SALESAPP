import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Register() { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const submitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post('http://localhost:4000/register', user);
      console.log(resp);
      if (resp.status === 201) {
        toast.success(resp.data.result);
        setLoading(false);
        navigate('/login');
        setUser({ firstName: '', lastName: '', email: '', password: '' });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      setLoading(false);
    }
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className='m-4 fs-3 fw-bold text-center'> Registration From</h3>
          <form onSubmit={submitRegister}>
            <div className='row'>
              <div className="mb-3  col-lg-6 col-md-6">
                <input type="text" className=" form-control" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} placeholder='Full Name' />
              </div>
              <div className="mb-3  col-lg-6 col-md-6">
                <input type="text" className=" form-control" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} placeholder='Last Name' />
              </div>
            </div>
            <div className="mb-3">
              <input type="email" className=" form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' />
            </div>
            <div className="mb-3">
              <input type="password" className=" form-control" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='**********' />
            </div>
            <div className='d-grid gap-2'>
              <button type="submit" className="btn btn-secondary">submit</button>
            </div>
          </form>
          <div className=' d-flex justify-content-center'>
            <p className='mt-3 text-secondary-emphasis fw-bold'>Already have an account ?<a className="fw-bold fs-3 text-dark text-decoration-none" href="/login"> Login </a></p>
          </div>
          <ToastContainer />
        </div>
      </div>
      {loading ? <div>
        <div className="loader"></div>
      </div> : ''}
    </div>
  )
}

export default Register;