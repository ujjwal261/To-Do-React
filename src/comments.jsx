import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";

export default function Comments(){
    const {id} = useParams();
    const [comment , setComment] = useState("");
    const [comments , setComments] = useState([]);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;


    const fetchComments = async() => {
        try{
            const response = await axios.get(`${baseUrl}/api/comments/get-all-comments/${id}`)
            if(response.status === 200){
                toast.success("comments fetched successfully");
                setComments(response?.data?.comments)
            }
        }catch(err){
            console.log("Error in fetching the comments",err);
            toast.error("Error in fetching the comments")
        }
    }

    const addComments = async() => {
        try{
            if(!comment){
                toast.error("text field is required");
            }
            const response = await axios.post(`${baseUrl}/api/comments/add-comment/${id}` , 
                {
                    text : comment
                }
            );
            if(response.status === 201){
                toast.success("Comments added successfully");
                fetchComments()
            }
        }catch(err){
            console.log(err);
            toast.error("Error in adding the comment");
        }
    }

    useEffect(() => {
        fetchComments()
    },[])
    
    return(
        <>
            <p>Add Comments</p>
            <input type="text" placeholder="Enter the comment"onChange={(e)=> setComment(e.target.value)} />
            <button onClick={addComments}>Add</button>
            <hr />
            <p>Comments List</p>
            <hr />
            <ul>
                {comments.map((comment , i) => <li key={comment._id}>{comment?.text}</li>)}
            </ul>
            <hr />
            
        </>
    )
}