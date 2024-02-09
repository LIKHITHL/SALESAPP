import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const resp = await axios.post('http://localhost:4000/login', user);
            if (resp.status === 200) {
                console.log(resp);
                localStorage.setItem('token', resp.data.result.token);
                toast.success(resp.data.result.message);
                setLoading(false);
                navigate('/addsales');
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
                    <h3 className=' m-4 fs-3 fw-bold text-center'>Login</h3>
                    <form onSubmit={submitLogin}>
                        <div className="mb-3">
                            <input type="email" className=" form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='email' />
                        </div>
                        <div className="mb-3">
                            <input type="password" className=" form-control" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='**********' />
                        </div>
                        <div className='d-grid gap-2'>
                            <button type="submit" className="btn btn-secondary  fs-4">submit</button>
                        </div>
                        <ToastContainer />
                    </form>
                    <div className=' d-flex justify-content-center'>
                        <p className='mt-3 fw-bold text-secondary-emphasis'>Don't have an account ?<a className="fw-bold fs-4 text-dark text-decoration-none" href="/register"> Register </a></p>
                    </div>
                </div>
            </div>
            {loading ? <div>
                <div className="loader"></div>
            </div> : ''}
        </div>

    );
}

export default Login;