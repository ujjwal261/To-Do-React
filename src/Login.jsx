import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const handleSubmit = async() => {
        try{
          const response = await axios.post(`${baseUrl}/api/user/login`,{
            email,
            password
          });
          console.log(response);
          navigate("/project")
          toast.success('User logged in successfully');
        }catch(err){
          console.log("Error in adding user");
          toast.error("Error in logging in")
        }
      }
    return(
      <div style={
        {
          display : "flex",
          height : "100%",
          width : "100%",
          justifyContent : "center",
          alignItems : "center"
        }
      }>
        <div style={{
          display : "flex",
          flexDirection : "column",
          height : "400px",
          width : "400px",
          justifyContent : "center",
        }}>
          <label htmlFor="">Email</label>
          <input type="email" name="email" placeholder="xyz@gmail.com" onChange={(e) => setEmail(e.target.value)}/><br/>
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/><br/>
          <span style={{
            width : "100%",
            textAlign : "center"
          }}><button onClick={handleSubmit}>Login</button></span>
        </div>
      </div>
    )
}

export default Login;