const express = require("express"); // required libraries
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const bcrypt = require('bcryptjs');
const {emailValidation, passwordValidation} = require("./validator")
const app = express() ;   // take express library and run it
const pool = require("./db");
const { response } = require("express");
//middleware

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

let userEmail;



//need to get data from client side by using request.body object
app.use(express.json())  //gives access to request.body and gives us json info

//  ROUTES ///


//create a todo

// app.post("/todos", async(req,res) => {
//         try {
            
//            const {description} = req.body
//            const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
//             [description]);

//                 // const newTodo = await pool.query("INSERT INTO users_todos (user_id,todo_id) VALUES ($1,$2) RETURNING *",[]) 
//                                                // INSERT INTO users_todos (user_id,todo_id) VALUES ('93','34') //user index and description index
//             res.json(newTodo.rows[0]);
//                 //  console.log(req.body)
//         } catch (err) {
//             console.log(err.message)
//         }
// } ) 

//get all todos

app.get("/usernames/:email" , async(req,res) => {   //change this usernames/:email   ...originally just /todos
    try {
           //const allTodos = await pool.query("SELECT * FROM todo")
        //    above is regular way, below is new way with users
        const {email} = req.params;
           const allTodos = await pool.query( //added todo.todo_id
               `SELECT todo.todo_id,todo.description
                FROM users_todos
                inner join username on username.user_id = users_todos.user_id
                inner join todo on todo.todo_id = users_todos.todo_id
                WHERE username.email = $1`,[email]  //need to get email here
                )
            res.json(allTodos.rows);
           // res.json(allTodos1.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get a todo

app.get("/todos/:id" , async(req,res) => {
    try {
            const {id} = req.params;
            const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
            res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})


//update a todo

app.put("/todos/:id" , async(req,res) => {
    try {
            const {id} = req.params;
            const {description} = req.body
            const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
             [description, id]);

            res.json("todo was updated");
    } catch (error) {
        console.error(err.message)
    }
})


//delete a todo

app.delete("/todos/:id" , async(req,res) => {
    try {
            const {id} = req.params;
            const deleteUserTodo = await pool.query("DELETE FROM users_todos WHERE todo_id = $1",[id]);
            const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);

            // delete from todo where todo_id = '418'
            // delete from users_todos where todo_id = '418'



            res.json("todo was deleted");
    } catch (error) {
        console.error(err.message)
    }
})




//register an account 

app.post("/usernames", async (req,res) => {
    try {
            const {username,email,pass} = req.body
            
            
            let errors = {};

            if (!emailValidation(email)) {
              errors.email = "Email is invalid";
            }
            if (!passwordValidation(pass)) {
              errors.pass = "Password is invalid";
            }
        
            const isEmailInUse = await pool.query(
              "SELECT * FROM username WHERE email = $1",
              [email]
            );
            if (isEmailInUse.rows.length > 0) {
              errors.emailInUse = "Email is already in use";
            }
        
            if (Object.keys(errors).length > 0) {
              return res.status(400).json(errors);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(pass,salt);
            const newUser = await pool.query("INSERT INTO username (username,email,pass) VALUES($1,$2,$3) RETURNING *", [username,email,hashedPass])
            res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message)
       res.status(500).json({err: err.message});
    }
})


//login

app.post("/login", async (req,res) => {

    try {
        const { email, pass } = req.body;
        const user = await pool.query("SELECT * FROM username WHERE email = $1", [
          email,
        ]);
        if (user.rows.length === 0) {
          return res.status(404).json({
            error: {
              message: "User not found",
            },
          });
        }
        const isMatch = await bcrypt.compare(pass, user.rows[0].pass);
        if (!isMatch) {
          return res.status(401).json({
            error: {
              message: "Incorrect password",
            },
          });
        }
        userEmail = email;
        res.status(200).json({ success: true, data:user.rows[0] });
      } catch (err) {
        res.status(500).send("Server Error");
      }


} );








//show all users

app.get("/usernames", async(req,res) => {
    try {
            const allUsers = await pool.query("SELECT * FROM username")
            res.json(allUsers.rows);
    } catch (err) {
        console.error(err)
    }
})



// app.get("/usernames" , async(req,res) => { //need to edit this
//     try {
//             const {email,pass} = req.body;
//             const todo = await pool.query("SELECT EXISTS (SELECT 1 FROM username WHERE email=$1 AND pass=$2)", [email,pass])
//             res.json(todo.rows);
            
//     } catch (error) {
//         console.error(err.message)
//     }
// })

//select exists(select 1 from username where username='john-smith' and email='johnsmith@gmail.com' and pass='123456')







app.get("/", async(req,res) => {
    try {
        const {email} = req.body;
const allUsersTodos = await pool.query(`SELECT todo.description FROM users_todos INNER JOIN username
ON username.user_id = users_todos.user_id inner join todo on todo.todo_id = users_todos.todo_id WHERE username.email = $1`,
[email]);
        
res.json(allUsersTodos.rows);
    } catch (err) {
        console.error(err)
    }
})


// SELECT todo.description FROM users_todos INNER JOIN username ON username.user_id = users_todos.user_id inner join todo on todo.todo_id = users_todos.todo_id WHERE username.email = $1, [email]

// SELECT todo.description
// FROM users_todos
// inner join username on username.user_id = users_todos.user_id
// inner join todo on todo.todo_id = users_todos.todo_id
// WHERE username.email = 'johnsmith@gmail.com'







app.post("/todos", async(req,res) => {
  try {
      
     const {description,email} = req.body
     const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]);

          // const newTodo = await pool.query("INSERT INTO users_todos (user_id,todo_id) VALUES ($1,$2) RETURNING *",[]) 
                                         // INSERT INTO users_todos (user_id,todo_id) VALUES ('93','34') //user index and description index

//[userid, newVisit.rows[0].visitid]
//const emailId = await pool.query("SELECT * FROM username WHERE email = $1",[email]) 
const emailId = await pool.query("SELECT * FROM username WHERE email = $1",[userEmail]) 
        //   [description]);
     const newTodo1 = await pool.query("INSERT INTO users_todos (user_id,todo_id) VALUES ($1,$2) RETURNING *",[emailId.rows[0].user_id,newTodo.rows[0].todo_id]) 
     // INSERT INTO users_todos (user_id,todo_id) VALUES ('93','34') //user index and description index

      res.json(newTodo.rows[0]);
          //  console.log(req.body)
  } catch (err) {
      console.log(err.message)
  }
} ) 

app.post("/todosAdd", async(req,res) => {
  try {
      
     const {id, description} = req.body //wrong params
    //  const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
    //   [description]);
     const newTodo = await pool.query("INSERT INTO users_todos (user_id,todo_id) VALUES (94,72) RETURNING *") 
                                         // INSERT INTO users_todos (user_id,todo_id) VALUES ('93','34') //user index and description index
      res.json(newTodo.rows[0]);
          //  console.log(req.body)
          //console.log("im here")
  } catch (err) {
      console.log(err.message)
  }
} ) 






//totally new for email

app.get("/usernameslist" , async(req,res) => {
  try {

    const allTodos = await pool.query( //added todo.todo_id
      `SELECT todo.todo_id,todo.description
       FROM users_todos
       inner join username on username.user_id = users_todos.user_id
       inner join todo on todo.todo_id = users_todos.todo_id
       WHERE username.email = $1`,[userEmail]  //need to get email here
       )
   res.json(allTodos.rows);
  } catch (error) {
      console.error(error.message)
  }
})














app.listen(5000, () => {
    console.log("server has started on port 5000")
});                                   //anytime we want server to start we have to listen to a port number
                                     //call back with indicates has started
                                     // node index --> server has started....
                                    //don't wanna use node because you have to restart for changes, 
                                    //so install nodemon globally and use "nodemon index" to run in terminally