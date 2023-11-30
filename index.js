import express from "express";
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

//connecting to mondodb named UserList using mongose ODM
mongoose.connect("mongodb://localhost:27017/UserList", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


const userList = new mongoose.Schema({
	email: {type: String},
	Password:{type: String},
	role: {type:String},
	tasks:[{type:String}]
})

userList.plugin(passportLocalMongoose);

//creating a model

const User = new mongoose.model("users", userList);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
	res.render("index.ejs");
})

app.get("/about", (req, res) => {
	res.render("about.ejs");
})

app.get("/ToDo" , (req,res) =>{
	if(req.isAuthenticated()){
		res.render("ToDo.ejs");
	}else{
		res.redirect("/Login");
	}
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

	req.login(user, function(err){
		if(err){
			console.log("login error");
		} else {
			console.log("sucessfully logged in")
			passport.authenticate("local")(req, res, function(){
				res.redirect("/Todo");
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

	User.register(newUser, req.body.password, function(err,user){
		if(err){
			console.log(err);
			res.redirect("/signUp");
		}else{
			console.log("console: no errors in registering");
			passport.authenticate("local")(req, res, function(){
				res.redirect("/Todo");
			});
		}

	});
});



app.listen(port, () => {
	console.log(`the server is running on port ${port}` );
})