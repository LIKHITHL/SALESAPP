import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful!');
    navigate('/');
  };

  const user = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container-fluid m-2">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <>
                <a className="navbar-brand" href="/addSales"><i className="fa-brands fa-salesforce fa-2xl"></i></a>
                <li className="nav-item">
                  <a className="nav-link active fw-bold fs-5" href="/addSales"> Add sales </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active fw-bold fs-5" href="/todayRevenue"> Revenue </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active fw-bold fs-5" href="/topFive"> Top Sales </a>
                </li>
                <li className="nav-item">
                  <button className="btn fw-bold fs-5" onClick={handleLogout}> Logout </button>
                </li>
              </>
            ) : (
              <>
                <a className="navbar-brand" href="/"><i className="fa-brands fa-salesforce fa-2xl"></i></a>
                <li className="nav-item">
                  <a className="nav-link active fw-bold fs-5" href="/login"> Login </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active fw-bold fs-5" href="/register"> Register </a>
                </li>
              </>
            )}
          </ul>
        </div>
        <ToastContainer />
      </div>
    </nav>
  );
};

export default Nav;