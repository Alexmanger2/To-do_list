import React, {Fragment, useEffect, useState} from 'react'

function InputTodo(props) {

    const [description,setDescription] = useState("")
    const [userId,setUserId] = useState("")  //new

    const onSubmitForm = async (e) =>{
             e.preventDefault();
             setUserId(props.email)
        try {
            const body = {"description": description, "email" : props.email}
            const response = await fetch("http://localhost:5000/todos",{
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(body)
           
        });
        //  setUserId(props.email)
        //addToUser()
        window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }
        //change this whole function with stuff in notepad
        console.log(props.email)
        console.log(description)
        console.log(userId)
        console.log("userId ******************")
        // const addToUser = async (e) => {
        //     //e.preventDefault();
        //     try {
        //          const body = {"id": userId, "description": description}; 
        //          //const body = {id, description}
        //          const response = await fetch("http://localhost:5000/todosAdd",{
        //          method: "POST",
        //          headers: {"content-Type": "application/json"},
        //          body: JSON.stringify(body)

                
        //     });
            
        //    //window.location = "/";
        //     } catch (err) {
        //         console.error(err.message)
        //     }
        // }

        //just added
        // useEffect(()=>{
        //     //getTodos();
        //     if(description !== "" || description.length > 0)
        //     addToUser()
        // },[])


    return (
        <Fragment>
            <h1 className='titleOfDoc text-center mt-5'>- To Do List -</h1>
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input type="text" className='form-control' 
                value={description} 
                onChange={e=>setDescription(e.target.value)}/>

                <button className='btn btn-success'>Add</button>
                                                        
            </form>
        </Fragment>
    )
}

export default InputTodo
