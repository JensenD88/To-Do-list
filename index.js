import  express  from "express";
const app = express();

app.use(express.static("public"));

app.get("/" , (req,res)=> {
	res.render("index.ejs");
})
app.get("/To-Do",(req,res)=>{
	res.render("ToDo.ejs");
})

app.get("/about",(req,res)=>{
	res.render("about.ejs");
})

app.post("/submit", (req,res)=>{
	res.render("ToDo.ejs");
})
app.listen(3000 , ()=>{
	console.log("the server is running on port 3000");
})