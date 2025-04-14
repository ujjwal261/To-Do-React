  import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Task from './Task';
import Login from './login';
import Register from './Register';



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
