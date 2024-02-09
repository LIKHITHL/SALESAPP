import { ToastContainer, } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Addsales from './components/addsales';
import Login from './components/login';
import Nav from './components/nav';
import Register from './components/register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topfive from "./components/topfive";
import Revenue from "./components/revenvue";
import Home from "./Home";

function App() {

  return (
    <div className="app-bg">
      <Router>
        <ToastContainer />
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/addsales" element={<Addsales />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/todayRevenue" element={<Revenue />}></Route>
          <Route exact path="/topFive" element={<Topfive />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;