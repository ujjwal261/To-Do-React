import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    console.log(process.env.REACT_APP_URI);
      const handleSubmit = async() => {
        try{
          console.log("running" , `${process.env.REACT_APP_URI}/user/login`);
          const response = await axios.post(`${process.env.REACT_APP_URI}/user/login`,{
            email,
            password
          });
          console.log(response);
          navigate("/task")
        }catch(err){
          console.log("Error in adding user");
        }
      }
    return(
        <>
            <label htmlFor="">Email</label>
            <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="">Password</label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSubmit}>Login</button>
        </>
    )
}

export default Login;