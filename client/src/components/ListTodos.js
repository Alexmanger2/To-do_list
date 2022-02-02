import React, {Fragment,useState,useEffect} from 'react'
import EditTodo from "./EditTodo"


function ListTodos(props) {
    
const [todos,setTodos] = useState([])
const [email,setEmail] = useState("")
const [date,setDate] = useState("")
//delete function

const deleteTodo = async (id) => {
    try { 
        const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE"
        });
         
        // console.log(deleteTodo)
        setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch (err) {
        console.error(err)
    }
}


const getTodos = async () => {
    
    // if(props.email.length > 0){
    //     setEmail(props.email)
    // }
    
    try {

        const response = await fetch("http://localhost:5000/usernameslist")  //changed from `http://localhost:5000/usernames/${props.email}`  //todos
        const jsonData = await response.json() //parsing data
        setTodos(jsonData)
        console.log(jsonData)
       setDate(props.date)
   
    } catch (err) {
        console.error(err.message)
    }
}

    useEffect(()=>{
        getTodos();
    },[])
    
   console.log(todos)





    return (
        <Fragment>
                     <table className="table mt-5 text-center">
    <thead>
      <tr className="colorTR">
        <th><h5>Description</h5></th>
        <th><h5>Date Created</h5></th>
        <th><h5>Edit</h5></th>
        <th><h5>Delete</h5></th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {/* {email === "" ? null : todos.map(todo => { //added conditional statement so doesnt display every email */}
      {/* *********  Logout not working because below ********* */}
        {todos.map(todo => {
          return(
     <tr key={todo.todo_id}>
        <td className="colorTD"><h4>{todo.description}</h4></td>
        <td className="inputDate"><h4>{date}</h4></td> 
        <td><EditTodo todo={todo}/></td>
        <td><button className='btn btn-danger' onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td> 
      </tr> 
          )
      })}
    </tbody>
  </table>
        </Fragment>
    )
}

export default ListTodos
