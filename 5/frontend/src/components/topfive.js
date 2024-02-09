import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Topfive() {
  const [topSales, setTopSales] = useState([]);
  const config = {
    headers: {
      "Content-type": "application/json",
      "authorization": "bearer " + localStorage.getItem("token")
    }
  }
  useEffect(() => {
    const topSales = async () => {
      try {
        const response = await axios.get('http://localhost:4000/topFive', config);
        setTopSales(response.data);
      } catch (error) {
        console.error('Error fetching top 5 sales:', error);
      }
    };

    topSales();
  }, []); // Run this effect only once on component mount

  return (
    <div className='container table-responsive-sm'>
      <h3 className='text-center mt-5 fs-1 fw-bold ' >TOP <i class="fa-solid fa-5 "></i> SALES</h3>
      <table className="table table-dark table-hover mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" className='SALES'>Sales Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Sale Amount</th>
          </tr>
        </thead>
        <tbody>
          {topSales.map((sale, index) => (
            <tr key={sale._id}>
              <th scope="row">{index + 1}</th>
              <td className='SALES'>{sale._id}</td>
              <td>{sale.product}</td>
              <td>{sale.quantity}</td>
              <td>{sale.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topfive;