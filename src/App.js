import React, { Component }  from 'react';
import "./App.css";
import Empolyee from "./components/Empolyee";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>
        <Routes>
        <Route exact path='/' element={<PrivateRoute />}>
          
          <Route index element={<Empolyee />} />

          <Route path="add" element={<Add />} />
          <Route path="add/:id" element={<Add />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          




        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
