import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

//connecting to mondodb named UserList using mongose ODM
mongoose.connect("mongodb://localhost:27017/UserList", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const userList = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	Password: {
		type: String, required: true
	},
	role: String
})
//creating a model
const User = new mongoose.model("users", userList);

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index.ejs");
})



app.get("/about", (req, res) => {
	res.render("about.ejs");
})


app.get("/signUp", (req, res) => {
	res.render("sign.ejs");
})

app.post("/signUp", (req, res) => {

	const mailId = req.body.Email;
	const passw = req.body.Password;
	const Rl = req.body.role;

	var newUser = new User({
		email: mailId,
		Password: passw,
		role: Rl
	})

	newUser
		.save()
		.then(() => {
			console.log(newUser);
			console.log("saved User successfully")
			res.render("ToDo.ejs");
		})
		.catch((err) => {
			console.log(err)
		})
  User.close;
})

app.get("/login", (req, res) => {
	res.render("log.ejs")
})

app.post("/login", (req, res) => {
	var mailEntered = req.body.mail;
	var passwordEntered = req.body.password;

	User.findOne({ email: mailEntered })
		.then((data) => {

			if (data) {
				//checking password 
				console.log("user exists")
				if (data.Password === passwordEntered) {
					res.render("ToDo.ejs");
					console.log("login successfull")
				}else{res.send("incorrect password")}
			}else{res.send("USER not found")}
		}
		)
})


app.listen(3000, () => {
	console.log("the server is running on port 3000");
})