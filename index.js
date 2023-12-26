import express, { json, query } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";



const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'im Darren IN India',
	resave: false,
	saveUninitialized: false,
  }))
  app.use(passport.initialize());
  app.use(passport.session());
app.use(bodyParser.json());

//connecting to mondodb named UserList using mongose ODM
mongoose.connect("mongodb://localhost:27017/UserList", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


const userList = new mongoose.Schema({
	username: {type: String},
	logName: {type: String},
	Password:{type: String},
	role: {type: String},
	taskS:{type:String}
})

userList.plugin(passportLocalMongoose);

//creating a model

const User = new mongoose.model("users", userList);
const tasks = new mongoose.model("tasks", userList);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
	res.render("index.ejs");
})

app.get("/about", (req, res) => {
	res.render("about.ejs");
})

app.get("/Todo" , (req , res) =>{
	const myString = req.query.name;
	const newStr = myString.slice(1, -1);
	req.session.name = newStr;

	console.log(newStr);
	// let newstr= req.locals.newStr;
	if(req.isAuthenticated()){
		 const task = tasks.find({logName : newStr}).select('name taskS -_id').then(docs =>{
			global.tasks = docs.map(taskS => taskS.taskS);
			
		})
		User.find({role :'user'}).select('name username -_id').then(users => {
			const usernames = users.map(user => user.username);
			console.log(usernames); // checking the usernames here
		    console.log(global.tasks);
			res.render("ToDo.ejs", {UserList : usernames, name : newStr, AllTasks : global.tasks});
		}).catch(err => {
			// Handle error here
			console.error(err);
		});
	
	}else{
		res.redirect("/Login");
	}
	
})


 app.post("/ToDo", (req,res) =>{
	let name = req.session.name;
	console.log(name);
	let Sname = `'${name}'`
	console.log(Sname);
	const giventask = new tasks({
		logName : name,
 		username: req.body.usersList,
 		taskS : req.body.tasks
 	})
 	
	console.log(giventask)
	giventask.save();
	console.log("The given task was saved in the DB");
	res.redirect(`/ToDo/?name=${Sname}`);

 	})

app.get('/ToDoUser', function(req,res,next){
	const SearchName = req.query.name;
	const Str = SearchName.slice(1, -1);
	console.log(Str);
	tasks.find({username : Str}).select('name taskS -_id').then(docs =>{
		 let Dtasks = docs.map(taskS => taskS.taskS);
		console.log(Dtasks);
		res.render("ToDoUser.ejs",{Display: Dtasks})
	})
	
})

app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

app.get("/login", (req, res) => {
	res.render("log.ejs")
})

app.post("/login", (req,res)=>{
	const user = new User({
		username: req.body.username,
		password: req.body.password
	})
	
	const Data = JSON.stringify(user.username);

	req.login(user, function(err){
		if(err){
			console.log("login error");
		} else {
			console.log("sucessfully logged in")
			passport.authenticate("local")(req, res, function(){
				User.findOne({username : user.username}).then((doc)=>{
					
					console.log(doc.role);
					if(doc.role === 'manager'){
						res.redirect(`/ToDo/?name=${Data}`);
					}
					else{
						res.redirect(`/ToDoUser/?name=${Data}`);
					}
				})
				
		})
			}
	})

})

app.get("/signUp", (req, res) => {
	res.render("sign.ejs");
})

app.post("/signUp", (req, res) => {
 const newUser = new User ({
	username : req.body.username,
    passWord : req.body.password,
	role : req.body.role
	})

	const Data = JSON.stringify(newUser.username);

	User.register(newUser, req.body.password, function(err,user){
		if(err){
			console.log(err);
			res.redirect("/signUp");
		}else{
			console.log("console: no errors in registering");
			passport.authenticate("local")(req, res, function(){

				res.redirect("/Todo?name=" + Data);
			});
		}

	});
});


app.listen(port, () => {
	console.log(`the server is running on port ${port}` );
})