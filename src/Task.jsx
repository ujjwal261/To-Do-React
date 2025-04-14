import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Task = () => {
    const currentDate = new Date() 
    const [tasks , setTasks] = useState([]);
    const [task , setTask] = useState("");
    const [date , setDate] = useState(currentDate.toISOString().split('T')[0]);

    const handleDeleteTask = async(id) => {
      try{
        const response = await axios.delete(`http://localhost:3000/api/tasks/delete-task/${id}`);
        if(response.status === 200){
          fetchTasks();
        }
      }catch(err){
        console.log(err);
      }
    }
    const updateTaskStatus = async(id) => {
      try{
        const response = await axios.patch(`http://localhost:3000/api/tasks/update-status/${id}` , {
          status : "completed"
        });
        if(response.status === 200){
          fetchTasks()
        }
      }catch(err){
        console.log(err);
      }
    }
    
    const fetchTasks = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/tasks/get-all-tasks`);
            console.log(response); 
            setTasks(response?.data?.tasks)
          }catch(err){
            console.log("Error fetching task");
          }
    }

    useEffect(() => {
        fetchTasks()
    },[]);

    const addTask = async () => {
        try{
          if(!task){
            toast.error("Task field is required");
            return;
          }
          const response = await axios.post(`http://localhost:3000/api/tasks/add-task` , {
            task_description : task,
            status : "pending",
            task_date : date
          });
          if(response.status === 202){
            setDate(currentDate.toISOString().split('T')[0]);
            console.log("running");
            setTask("");
            fetchTasks(); 
          }
        }catch(err){
          toast.error("Error in adding the task");
        }
      }
    return(
        <>
            <hr />
              Add Task here
            <hr />
            <input type="text" onChange={(e) => setTask(e.target.value)} value={task}/>
            <input type="date" onChange={(e) => setDate(e.target.value)} value={date}/>
            <button onClick={addTask}>Add</button><br />
            <hr />
            {tasks?.map((item , index) => (
                <>
                    <input type="text" disabled value={item.task_description} />
                    <input type="date" disabled value={item.task_date?.toString().split('T')[0]}/>
                    <button onClick={() => updateTaskStatus(item._id)} disabled = {item.status === "completed"}>{item?.status === "Pending" ? <>Complete</> : <>Completed</> }</button>
                    <button onClick={() => handleDeleteTask(item._id)} >Delete</button><br />
                </>
            ))}
        </>
    );
}

export default Task;