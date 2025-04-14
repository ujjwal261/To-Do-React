import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Task = () => {
    const [tasks , setTasks] = useState([]);
    const [task , setTask] = useState("");
    const [date , setDate] = useState(new Date());
    
    const fetchTasks = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_URI}/tasks/get-all-tasks`);
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
          const response = await axios.post(`${process.env.REACT_APP_URI}/tasks/add-task` , {
            task_description : task,
            status : "pending",
            task_date : date
          });
          console.log(response);
        }catch(err){
          console.log("Error in adding the task")
        }
      }
    return(
        <>
            <input type="text" onChange={(e) => setTask(e.target.value)} />
            <input type="date" onChange={(e) => setDate(e.target.value)} />
            <button onClick={addTask}>Add</button>
            <ul>
            {tasks?.map((item , index) => (
                <>
                    <li>{item.task_description}</li>
                    <li>{item.task_date}</li>
                </>
            ))}
            </ul>
        </>
    );
}

export default Task;