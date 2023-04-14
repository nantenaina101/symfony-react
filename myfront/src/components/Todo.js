import React, {useState} from "react";

export default function Todo() {
    
    const [taskName, setTaskName] = useState("")
    const [time, setTime] = useState("")
    const [taskList, setTaskList] = useState([])
    
    const addTask = () => {
        setTaskList([...taskList, { task: taskName, time: time }])
        console.log(taskList);
        setTaskName("")
        setTime("")
    }
    
    return (<div className="todo">
        <h1>Todo List</h1>
        <input type="text" placeholder="Task Name" onChange={(e)=>{setTaskName(e.target.value)}}/>
        <input type="text" placeholder="Date" onChange={(e)=>{setTime(e.target.value)}}/>
        <button onClick={addTask}>Ajouter</button>
        {taskList.map(task => {
            //console.log(task);
            return (
                <div className="task">
                    <div>{task.task}</div>
                    <div>{task.time}</div>
                </div>
            );
        })}
    </div>);
}