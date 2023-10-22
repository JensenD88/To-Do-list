import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
	res.render("index.ejs");
})

app.get("/To-Do", (req, res) => {
	res.render("ToDo.ejs");
})

app.get("/about", (req, res) => {
	res.render("about.ejs");
})

app.get("/login", (req, res) => {
	res.render("log.ejs")
})

app.post("/login", (req,res)=>{
	//console.log(req.body.User);
	const valid = req.body.User;
	 
	if(valid === "Darren" ){
		res.render("ToDo.ejs");
	}else{
		console.log("wrong user");
	} 
})

app.get("/signUp", (req, res) => {
	res.render("sign.ejs");
})



app.listen(3000, () => {
	console.log("the server is running on port 3000");
})