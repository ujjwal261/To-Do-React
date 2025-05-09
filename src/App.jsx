import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login.jsx';
import Register from './Register.jsx';
import Comments from './comments.jsx';
import Project from './Project.jsx';



function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project-comments/:id" element={<Comments />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
