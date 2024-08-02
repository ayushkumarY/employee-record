import React from 'react'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmp from './components/AddEmp/AddEmp';
import Dashboard from './components/Dashboard';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="/add" element={<AddEmp />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App