var restify =require('restify')
var builder = require('botbuilder');
var request  = require('request');
var http = require('http');
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});


var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
console.log('command from skype:-'+session.message.text);
 var command=session.message.text;
 if(command == 'hello' || command == 'Hello'){
       session.send("hi, how are you?");
	}
	
	else if(command == 'hi' || command == 'Hi'){
		session.send('Hello'); 
	}
	else if(command =='how are you' || command =='How are you'){
		session.send('I am good. How about you?');
	}
	else if(command =='who made you' || command =='who is your creator' || command =='you are created by whom'){
		session.send('I m SENSEI THE CHATBOT created by group of four people');
	}
    else if(command == 'i am fine' || command == 'I am fine' ||  command == 'I m fine' || command == 'i m fine' || command == 'fine'){
		session.send("That's great. How can I help you ?");
	}
	else if(command =='how many countries are there in the world' || command =='Countries' || command =='countries'){
		session.send('As per the WORLD COUNTRY  infomation statistics there are 196 countries in the world today. Taiwan is not considered an official country by many, which would bring the count down to 195 countries. ');
	}

	
	else if(command == 'who are you' || command == 'Who are you')
	{
		session.send('I am SENSEI, your virtual assistant. how can i help you ');
	}


	else if(command == 'I love you' || command == 'I like you' ||  command == 'i like you' ||  command == 'i love you'){
		session.send('Thank you!'); 
	}
	
    
	else if(command == 'jokes' || command == 'Jokes'){
			session.send('Jokes are working');
		  var urlw = 'http://api.icndb.com/jokes/random';
          request.get(urlw,function(error,response,body){
               var jokes = JSON.parse(body);
			   var joke = jokes.value.joke;
			   session.send('JOKE - ' + joke);
			});
		}


	else if(command == 'quotes' || command == 'Quotes'){
		session.send("Quotes are working");
		var urlw = 'https://talaikis.com/api/quotes/random/';
				request.get(urlw,function(error,response,body){
					var quotes = JSON.parse(body);
					var title = quotes.quote;
					var content = quotes.author;
					session.send('QUOTE - ' + title);
					session.send('AUTHOR - ' + content);
			});
		}



	else if(command == 'news' || command == 'News'){
		session.send("News is working");
		var urlw = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=3ab4d46734bf495083ae1b7ce72ec8f3';
				request.get(urlw,function(error,response,body){
					var news = JSON.parse(body);
					var i = Math.floor(Math.random() * 10) + 0											
					var title = news.articles[i].title;
					var description = news.articles[i].description;
					session.send('NEWS TITLE - ' + title);
					session.send('NEWS DESCRIPTION -' + description); 
					
			});
		}



		else if(command == 'weather' || command == 'Weather' || command =='what is the weather' || command =='what is the weather today'){
						session.send('weather is working');
						var urlw = 'http://api.openweathermap.org/data/2.5/weather?q=Asian%20Games%20Village,%20IN&appid=e08359437495887563ff39a2cdcf14c3';
						request.get(urlw,function(error,response,body){
						var weather = JSON.parse(body);
						var temp = weather.main.temp;
						var pressure = weather.main.pressure;
						var humidity = weather.main.humidity;
						temp = temp - 273.15;
						session.send('Temperature in New Delhi is '+ temp + ' degrees');
						session.send('Pressure in New Delhi is '+ pressure + ' Pascal');
						session.send('Humidity in New Delhi is '+ humidity);
			 
			});
		}	





else if(command=='okay' || command=='ok' || command=='OK'|| command=='Ok'|| command=='Okay')
{
session.send("hmm");
session.send("want some jokes or some news !!!");
session.send("*_*");
}		


else if(command =='thanks' || command=='thank you'|| command=='thankyou' || command=='Thanks' || command=='Thank you' || command=='Thankyou')
			{
			session.send('welcome sir. try something else');	
			session.send("Please choose an option below. ");
			session.send("like: 1: Weather");
			session.send("2: Jokes ");
			session.send("3: Quotes");
			session.send("4: News");
			session.send(" 5: Shopping");
    		}
    			

else if(command=='bye'|| command=='Bye'|| command=='tata' || command =='bie')
		{
		session.send("Good BYE !!!Take care ...");
		session.send("Have a Nice day ");
		}

else if(command=='shopping' || command=='Shopping'){
    session.send("Hi... We sell clothing products. Say 'show items' to see our products.");}
else{
    		session.send("try an option below.");
			session.send("like: 1: Weather");
			session.send("2: Jokes ");
			session.send("3: Quotes");
			session.send("4: News");
			session.send(" 5: Shopping");
    		
	}
});

// ***************************************Add dialog to return list of shirts available******************************************************************************
bot.dialog('showitems', function (session) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel)
    msg.attachments([
        new builder.HeroCard(session)
            .title("Classic White T-Shirt")
            .subtitle("100% Soft and Luxurious Cotton")
            .text("Price is $25 and carried in sizes (S, M, L, and XL)")
            .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/whiteshirt.png')])
            .buttons([
                builder.CardAction.imBack(session, "buy classic white t-shirt", "Buy")
            ]),
        new builder.HeroCard(session)
            .title("Classic Gray T-Shirt")
            .subtitle("100% Soft and Luxurious Cotton")
            .text("Price is $25 and carried in sizes (S, M, L, and XL)")
            .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/grayshirt.png')])
            .buttons([
                builder.CardAction.imBack(session, "buy classic gray t-shirt", "Buy")
            ]),
	 new builder.HeroCard(session)
            .title("Classic Black T-Shirt")
            .subtitle("100% Soft and Luxurious Cotton")
            .text("Price is $21 and carried in sizes (S, M, L, and XL)")
            .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/grayshirt.png')])
            .buttons([
                builder.CardAction.imBack(session, "buy classic Black t-shirt", "Buy")
            ]),
	 new builder.HeroCard(session)
            .title("Black Leather jacket")
            .subtitle("100% Soft and warm")
            .text("Price is $25 and carried in sizes (S, M, L, and XL)")
            .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/grayshirt.png')])
            .buttons([
                builder.CardAction.imBack(session, "buy Black Leather jacket", "Buy")
            ]),
	 new builder.HeroCard(session)
            .title("modern PUMA trousers")
            .subtitle("100% Soft ")
            .text("Price is $80 and carried in sizes")
            .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/grayshirt.png')])
            .buttons([
                builder.CardAction.imBack(session, "buy PUMA trousers", "Buy")
            ])
    ]);
    session.send(msg).endDialog();
}).triggerAction({ matches: /^(show|list)/i });
bot.dialog('buyButtonClick', [
    function (session, args, next) {
        // Get color and optional size from users utterance
        var utterance = args.intent.matched[0];
        var color = /(white|gray)/i.exec(utterance);
        var size = /\b(Extra Large|Large|Medium|Small)\b/i.exec(utterance);
        if (color) {
            // Initialize cart item
            var item = session.dialogData.item = { 
                product: "classic " + color[0].toLowerCase() + " t-shirt",
                size: size ? size[0].toLowerCase() : null,
                price: 25.0,
                qty: 1
            };
            if (!item.size) {
                // Prompt for size
                builder.Prompts.choice(session, "What size would you like?", "Small|Medium|Large|Extra Large");
            } else {
                //Skip to next waterfall step
                next();
            }
        } else {
            // Invalid product
            session.send("I'm sorry... That product wasn't found.").endDialog();
        }   
    },
    function (session, results) {
        // Save size if prompted
        var item = session.dialogData.item;
        if (results.response) {
            item.size = results.response.entity.toLowerCase();
        }

        // Add to cart
        if (!session.userData.cart) {
            session.userData.cart = [];
        }
        session.userData.cart.push(item);

        // Send confirmation to users
        session.send("A '%(size)s %(product)s' has been added to your cart.", item).endDialog();
    }
]).triggerAction({ matches: /(buy|add)\s.*shirt/i });

