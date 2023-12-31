1. change the wall paper with basic wallpaper.
2. check and change ccs class names (need to be unique).
3. mongoose-encrytion npm to encrypt password feild in the dataBase
4. Dotenv to make sure SECRETS or APIkeys are not public.

_________________________


Features.
product name : TaskMinder (Agile task management software).
menu 
1. login.( U -id , password , roll)
2. product backlog.(USer story number, description)
3. sprint tasks.
4. logout.
5. home.
__________________________

1. creating a portal, product owner can create the product backlogs(user story)
2. scrum master asigns the user story to the scrum team.
3. scrum team can pick user story, work on it and change it accordingly.
__________________________

url.username#
<string>
Gets and sets the username portion of the URL.

const myURL = new URL('https://abc:xyz@example.com');
console.log(myURL.username);
// Prints abc

myURL.username = '123';
console.log(myURL.href);
// Prints https://123:xyz@example.com/ COPY
Any invalid URL characters appearing in the value assigned the username
 property will be percent-encoded. The selection of which characters to percent-
 encode may vary somewhat from what the url.parse() and url.format( ) methods would produce.
 _____________________________
  <% for (let i=0; i<tasksAdded; i++) %>
            <li><%= tasksAdded[i] %></li>

___________________________________

change schema types and use PUSH to insert strings in the tasks array
_____________________________________

if(req.isAuthenticated()){
		
	   User.find({}).select('name -_id').select('username').then(
	 	users =>{
			console.log(users)
			const mergedObject = users.reduce((result, currentObject) => {
				return { ...result, usernames: [...(result.usernames || []), currentObject.username] };
			  }, {});
			  
			  console.log(mergedObject);
	 		res.render("ToDo.ejs");
	 	}
	  )
	
	}else{
		res.redirect("/Login");
	}
	_________________________

	Admin route
		- 

_________________________

<img src="/images/12297152_4892463.png">
    <div class="container">
        <h2>Introducing TaskMinder</h2>
    <p>Your ultimate productivity companion. Our sleek and user-friendly to-do list product is designed
    to streamline your daily tasks, making organization effortless. Whether you're managing personal projects or
    collaborating with a team, TaskMinder is your go-to solution for boosting efficiency and taking control of your busy
    life. Try TaskMinder today and transform the way you tackle your to-do lists.</p>
    <a class="button" href="/signUp">Register</a>  
    </div>
	___________________________________

	 <a href="/">Home</a>
    <a href="/login">Login</a>
    <a href="/about">About</a>
    <a href="/Logout">Logout</a>

	___________________________________
	<div class="container2">
            <h1>Login</h1>
            
            <form method="post" action="/login"> 
                <label >Email</label>
                <input type="text"  name ="username" required>
                <label >Password</label>
                <input type="text"  name="password" required>
                <input type="submit" value="login">
        
            </form>
               <p>Don't have an account <a href="/signUp">Sign up</a></p>