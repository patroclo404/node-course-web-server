const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials' );
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{

	var log = `${ new Date().toString() }${req.method} ${req.url} \n`;

	console.log(log);  

	fs.appendFile('server.log', log  , (err)=>{
		if(err){
			console.log('unable to append to server.log');
		}
	});
	next();
});


/*app.use(( req, res, next )=>{

	res.render('maintenance.hbs',{
	});

});*/


app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pageTitle : 'home',
		welcomeMessage : 'Welcome to node page',
		currentYear : new Date().getFullYear()
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle : 'About Page',
		currentYear : new Date().getFullYear()
	});
});

app.listen( port , () => {
  console.log(`Server is up on port ${port}`);
});