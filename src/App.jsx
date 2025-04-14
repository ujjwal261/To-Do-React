  import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Task from './Task.jsx';
import Login from './login.jsx';
import Register from './Register.jsx';



function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/task" element={<Task />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
