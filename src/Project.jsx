import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Project = () => {
    const navigate = useNavigate();
    const [projects , setProjects] = useState([]);
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [link ,setLink] = useState("");
    const [query , setQuery] = useState('');
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [searchResult , setSearchResult] = useState({
      projectResult : [],
      userResult : []
    })


    const handleSearchByUserOrProject = async () => {
      try{
        const response = await axios.get(`${baseUrl}/api/search?q=${query}`);
        if(response.status === 200){
          setSearchResult({
            projectResult : response.data.project,
            userResult : response.data.user
          });
          console.log({
            projectResult : response.data.project,
            userResult : response.data.user
          })
        }
      }catch(err){
        toast.error("Error in fetching the result")
      }
    }

    useEffect(()=>{
      const timeout = setTimeout(() => {
        if (query.trim()) {
          handleSearchByUserOrProject();
        } else {
          setSearchResult({ projectResult: [], userResult: [] }); // Clear results when query is empty
        }
      },500);
      
      return () => clearTimeout(timeout);
    },[query])

    const handleDeleteProject = async(id) => {
      try{
        const response = await axios.delete(`${baseUrl}/api/projects/delete-project/${id}`);
        if(response.status === 200){
          fetchProjects();
        }
      }catch(err){
        console.log(err);
      }
    }
    
    const fetchProjects = async () => {
        try{
            const response = await axios.get(`${baseUrl}/api/projects/get-all-projects`);
            console.log(response); 
            setProjects(response?.data?.projects)
          }catch(err){
            console.log("Error fetching task");
          }
    }

    useEffect(() => {
      fetchProjects()
    },[]);

    const postProject = async () => {
        try{
          if(!title || !description){
            toast.error("title and description fields are required");
            return;
          }
          if(link && !link.toLowerCase().includes("https") && !link.toLowerCase().includes(".com")){
            toast.error("Please add valid link");
            return;
          }
          const response = await axios.post(`${baseUrl}/api/projects/add-project` , {
            title : title,
            description : description,
            link : link
          });
          if(response.status === 202){
            setTitle("");
            console.log("running");
            setDescription("");
            setLink("");
            fetchProjects(); 
          }
        }catch(err){
          toast.error("Error in adding the project");
        }
      }
    return(
        <>
            <hr />
              Add Project Here
            <hr />
            <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
            <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} value={description}/>
            <input type="text" placeholder="link" onChange={(e) => setLink(e.target.value)} value={link}/>
            <button onClick={postProject}>Post</button><br />
            <hr />
            <div style={{
              display : "flex",
              flexDirection : "column",
              justifyContent : "center",
              alignItems : "center"
            }}>          
              {projects?.map((item , index) => (
                  <>  
                  <div>
                    <p>Project title</p>
                    <input type="text" disabled value={item.title} />
                  </div>
                  <div>
                    <p>Description</p>
                    <input type="text" disabled value={item.description}/>
                  </div>
                  <div>
                    <p>Project Link</p>
                    <input type="text" disabled value={item.link}/>
                  </div>
                      {/* <button onClick={() => updateTaskStatus(item._id)} disabled = {item.status === "completed"}>{item?.status === "Pending" ? <>Complete</> : <>Completed</> }</button> */}
                      <button onClick={() => handleDeleteProject(item._id)} >Delete</button><br />
                      <button onClick={() => {
                        navigate(`/project-comments/${item._id}`)
                      }} >Comment</button><br />

                  </>
              ))}
            </div>
            <hr />
            <div style={{
              display : "flex",
              flexDirection : "column",
              justifyContent : "center",
              alignItems : "center"
            }}>
              <hr />
                <p>Search Projects</p>
              <hr />
              <input type="text" placeholder="search projects by name" onChange={(e) => setQuery(e.target.value)} />
              <div style={{
              display : "flex",
              flexDirection : "column",
              justifyContent : "center",
              alignItems : "center"
            }}> 
            
            
            </div>
            <hr />
              {searchResult?.projectResult?.map((item, index) =>{
                return(

                  <React.Fragment key={item._id || index}>  
                    <div>
                      <p>Project title</p>
                      <input type="text" disabled value={item.title} />
                    </div>
                    <div>
                      <p>Description</p>
                      <input type="text" disabled value={item.description} />
                    </div>
                    <div>
                      <p>Project Link</p>
                      <input type="text" disabled value={item.link} />
                    </div>
                  </React.Fragment>
              )

              } )}
              <hr />
            </div>
        </>
    );
}

export default Project;