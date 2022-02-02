import './App.css';
import React,{Fragment,useState} from 'react';
import InputTodo from './components/InputTodo'
import ListTodos from './components/ListTodos'
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import NavBar from './components/NavBar';


function App(props) {

    const [displayName,setDisplayName] = useState("");
    const [email,setEmailFromLogin] = useState("")
   const [logout,setLogout] = useState(false)
   const [today,setToday] = useState(new Date());
   const [date,setDate] = useState((today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear())
   // const current = new Date();
   // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
   
  // let today = new Date(),
  // date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

    const updateEmail = (userEmail) => {
        if(userEmail !== "" || userEmail.length > 0)
          setEmailFromLogin(userEmail)
          else
          setEmailFromLogin(null)
    }

  return (
    <Fragment>
 <BrowserRouter>              
<div className="container">

          {/* <Link to="/userRegister" element={<UserRegister/>} >Register</Link> <br/>
          <Link to="/userLogin" element={<UserLogin/>} >Login</Link><br/> */}
           {/* <Link to="/userRegister">Register</Link> <br/>
          <Link to="/userLogin">Login</Link><br/>
          <Link to="/" >Home</Link><br/> */}
         <div className="navbar navbar-dark bg-dark">
          <NavBar setLogout={setLogout} setEmailFromLogin={setEmailFromLogin} />
          {<h4 className="todayDate">{date}</h4>}
          </div>
          {/* <Link to="/">Log out</Link> */}
          {/* <h1>Current date is {date}</h1> */}
          {/* <h2 className='text-right'> Hello, {displayName}</h2> */}
          {displayName !== "" ? <h2 className='text-right' >Hello, {displayName}</h2>: null}
          <Routes>
            
                    <Route exact path="/userRegister" element={<UserRegister setDisplayName = {setDisplayName} />} />
                     <Route exact path='/' element={
                     <Fragment>
                      <InputTodo email={email}/>
                      <ListTodos email={email} date={date}/>
                     </Fragment>
                         } />
                         
                  <Route exact path="/userLogin" element={<UserLogin updateEmail={updateEmail} setLogout={setLogout}/>} />
          </Routes>
    
  </div>
  </BrowserRouter>

  {/* <InputTodo/>
  <ListTodos/> */}
    </Fragment>
  );
}

export default App;
