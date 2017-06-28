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
       session.send("Command Found");
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
			   session.send('Error aa gaya');
                         }
                        
                          
			
	 });
		
    }

    else{
    	session.send("Don't know the command");
	session.send("Example Commands, quotes,score,datesheet,news");
    }

    

    
});
