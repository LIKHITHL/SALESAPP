import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Revenue() {
  const [totalRevenue, setTotalRevenue] = useState("");
  const config = {
    headers: {
      "Content-type": "application/json",
      "authorization": "bearer " + localStorage.getItem("token")
    }
  }
  useEffect(() => {
    const TotalRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:4000/todayRevenue', config);
        setTotalRevenue(response.data[0].amount)
      } catch (error) {
        console.error('Error fetching revenue', error);
      }
    };
    TotalRevenue();
  }, []);
  return (
    <div className='Revenue'>
      <h1 className='mt-5 fs-1 fw-bold '>
        TOTAL REVENUE IS = <i class="fa-solid fa-indian-rupee-sign"></i> {totalRevenue}
      </h1>
    </div>
  );
}
export default Revenue;