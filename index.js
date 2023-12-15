const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const taskModel = require("./task");
const userModel = require('./user');
const expressSession = require('express-session');
const passport = require('passport')
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

app.use(cors());
app.use(express.json()); 

app.use(expressSession({
  resave:false,
  saveUninitialized: false,
  secret: 'anything'
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());




app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.post('/register', async (req, res)=>{
// try {
//   var userData = new userModel({
//     username: req.body.username,
//     email: req.body.email,
//   });
//  const user = await userModel.register(userData, req.body.password);
//   passport.authenticate('local')(req, res, function(){
//   })
//   res.send(user)
//   console.log(user)
// } catch (error) {
//   console.log(error)
// }

// })

// //login 
// app.post('/login',)

app.post('/add', async (req, res) => {
const newTask = await taskModel({
  task: req.body.task
})
await newTask.save()
res.send(newTask)
  
});

// app.post("/login", passport.authenticate("local"), async(req, res)=>{
//   const user = await userModel.findOne({username: req.session.passport.user})
// res.send(user)
// });

app.get('/tasks', async (req, res)=>{
  const allTasks = await taskModel.find()
  res.send(allTasks);
})
app.delete('/remove/:id', async (req, res)=>{
  const trgtElm = req.params.id
  const dltElm = await taskModel.findOneAndDelete({_id:trgtElm})
  res.send(dltElm) 
})
//isLoggedIn
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
