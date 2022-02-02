import { useState,useEffect,Fragment} from "react";
import { Navigate } from "react-router-dom";

function UserRegister(props) {
  
  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [redirect,setRedirect] = useState(false)
  //const [userId,setUserId] = useState("") //new

const onSubmitForm =  async(e) => {
  e.preventDefault();
  if(username.length > 0 && email.length > 0 && pass.length > 0){
  // e.preventDefault();
    try {
        const body = {"username": username , "email": email , "pass": pass}; 
        console.log(body)
        const response = await fetch("http://localhost:5000/usernames",{
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(body)
    });
    
    if(response.status === 500 || response.status === 400){
      alert("Email already exists");
    }else{
    
    console.log(response.status)
    props.setDisplayName(username)
    setRedirect(true)
    }
    //window.location = "/";
    //navigate maybe?
    } catch (err) {
        console.error(err.message)
        setRedirect(false)
    }}else{
      e.preventDefault();
      alert(`Enter a value username`)
      setRedirect(false)
    }
} 

if (redirect) {
  return <Navigate to="/" />;
}

  return (
        <Fragment>

<form onSubmit={onSubmitForm}>

{/* <div className="form-group d-flex">
    <label htmlFor="username">UserName:</label>
    <input type="text" className="form-control" placeholder="Enter username" onChange={(e)=>setUserName(e.target.value)}/>
  </div> */}

<div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">UserName:</span>
  </div>
  <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
  placeholder="Enter username" onChange={(e)=>setUserName(e.target.value)}/>
</div>



  {/* <div className="form-group d-flex">
    <label htmlFor="email">Email:</label>
    <input type="text" className="form-control" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
  </div> */}


<div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">Email:</span>
  </div>
  <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
  placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
</div>


  {/* <div className="form-group d-flex">
    <label htmlFor="pwd">Password:</label>
    <input type="text" className="form-control" placeholder="Enter password" onChange={(e)=>setPass(e.target.value)}/>
  </div>
  <div className="form-group form-check">
  </div> */}


<div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">Password:</span>
  </div>
  <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
  placeholder="Enter password" onChange={(e)=>setPass(e.target.value)}/>
</div>


  <button  className="btn btn-warning">Register</button>
</form>

        </Fragment>
    )
}

export default UserRegister;

