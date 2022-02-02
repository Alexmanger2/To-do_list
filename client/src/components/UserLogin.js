import { useState,useEffect,Fragment } from "react";
import { Navigate } from "react-router-dom";


function UserLogin(props) {
 
 
 const [email,setEmail] = useState("")
 const [pass,setPass] = useState("")
 const [redirect,setRedirect] = useState(false)

 
 const onSubmitForm =  async(e) => {
    e.preventDefault();
    try {
        const body = {"email": email , "pass": pass}; 
        console.log(body)
        const response = await fetch("http://localhost:5000/login",{
          method: 'POST',
          headers: {"content-Type": "application/json"},
          body: JSON.stringify(body)
        });
          props.updateEmail(email);  //sending email to be sent to app.js to be used in long query with joins 
          setRedirect(true);
        //  props.setLogout(false);
      }
   // window.location = "/";
    //navigate maybe?
    catch (err) {
        console.error(err.message)
        setRedirect(false)
    }

  }

  if(redirect){
    return <Navigate to="/"/>
  }
 
 return (<Fragment>


<form onSubmit={onSubmitForm}>

  {/* <div className="form-group d-flex">
    <label htmlFor="email">Email:</label>
    <input type="text" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
  </div> */}

<div className="input-group input-group-sm mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroup-sizing-sm">Email:</span>
  </div>
  <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
       placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
</div>



  {/* <div className="form-group d-flex">
    <label htmlFor="pwd">Password:</label>
    <input type="text" className="form-control" placeholder="Enter password" onChange={(e) => setPass(e.target.value)}/>
  </div>
  <div className="form-group form-check">
  </div>
  <button  className="btn btn-warning">Login</button> */}


<div className="input-group input-group-sm mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroup-sizing-sm">Password:</span>
  </div>
  <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
       placeholder="Enter password" onChange={(e) => setPass(e.target.value)}/>
</div>

  <button className="btn btn-warning text-center">Login</button>
</form>


  </Fragment>
  )

}
export default UserLogin
