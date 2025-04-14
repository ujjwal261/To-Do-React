import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async() => {
        try{
          const response = await axios.post(`${process.env.REACT_APP_URI}/user/sign-up`,{
            email,
            password
          });
          console.log(response);
        }catch(err){
          console.log("Error in adding user");
          navigate("/login");
        }
    }
    return(
        <>
            <label htmlFor="">Email</label>
            <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="">Password</label>
            <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSubmit}>Register</button>
        </>
    )
}

export default Register;