var restify = require('restify');
var builder = require('botbuilder');
var request  = require('request');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    console.log('Commnad from skype : - '+session.message.text);
    var command = session.message.text;
    if(command == 'hello'){
       session.send("Hi, I am Sensei your personal bot ");
	session.send("Give me command like: weather,datesheet,jokes,news");
     }
                          
    else if(command == 'jokes'){
       // Logic to get the joke from api
	var url  =  'http://api.icndb.com/jokes/random';
          request(url,function(error,response,body){
                       // console.log('Err -> '+error + body +response);
		try{
		var temp = JSON.parse(body);
		// console.log('joke : - '+temp.value.joke);
		session.send(temp.value.joke);
		   }
		catch(ex){
		 console.log('Error');
		 }
          });
        }
	else if(command == 'datesheet'){
		session.send('http://www.ipu.ac.in/exam_datesheet.php');
		}
			      
		else if(command == 'quotes')
			{
			console.log('nothing');
			session.send('nothing');
			 }
		else if(command == 'weather')
		{
						console.log('weather is working');
						var urlw = 'http://api.openweathermap.org/data/2.5/weather?q=New+Delhi,IN&appid=d572465715035d423880c2c70de3b469&units=metric';
						request(urlw,function(error,response,body)
						{
						var weather = JSON.parse(body);
						var temp = weather.main.temp;
						var pressure = weather.main.pressure;
						var humidity = weather.main.humidity;
						var min_temp = weather.main.temp_min;
						var max_temp = weather.main.temp_max;
						console.log('temperature is '+ temp);
						session.send('===============================================');
						session.send('Temperature in New Delhi is : '+temp + ' degree');
						session.send('Pressure in New Delhi is : '+pressure + ' Pascal');
						session.send('Humidity in New Delhi is : '+ humidity );
						session.send('Minimum temperature in New Delhi is : '+ min_temp +' Degree');
						session.send('Maximum temperature in New Delhi is : '+ max_temp + ' Degree');
						session.send('===============================================');
						});
			 
		}
			else if(command=='news'){
				console.log('news is working');
				session.send('Here is your link for tech-news:'+'http://money.cnn.com/technology/');
				
				}
    			else if(command=='How are you'){
				session.send("Great,What about you?");
						}
			else if(command=="Random Facts"){
				var urlm = "https://en.wikipedia.org/wiki/Special.random";
				request(urlm,function(error,response,body){
				
				session.send("Here it is what i found :"+ urlm);
						});}
			else if(command=='sleep'){
					session.send('Early to bed early to rise');				}

		else{
    			session.send("Don't know the command");
			session.send("I can tell you about: weather,jokes,quotes,score,datesheet,news");
 		}
    
});
