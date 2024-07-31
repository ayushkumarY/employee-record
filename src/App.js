import React from 'react'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmp from './components/AddEmp/AddEmp';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddEmp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App