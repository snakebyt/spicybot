//Spicybot, your friendly spicypixel replacement

var irc = require('irc');
const fs = require('fs');
const getClickbait = require('./app/clickbait');
const config = {
	channels: ['#hwjunkies'],
	server : 'irc.quakenet.org', 
	botName : 'spicypibot'
};

var curMsg = "kjasdasndoapifjferiwejfnqwkmwe";

var spicybot = new irc.Client(config.server, config.botName, {
	channels : config.channels
});



spicybot.masturbate = function(){
	grip = Math.floor(Math.random()*8)+5;
	lube = grip*1000;
	smeg = lube*60;
	return smeg;
};

spicybot.ifQuiet = function(initMsg, currentMsg){
		if (currentMsg === initMsg){
			if(Math.random() > 0.3){
				spicybot.snark();
			}else{
				console.log("Saw opening, didn't bother");
			}
		}else{
			//sulk
		}
};

spicybot.snark = function(){

	var shitpost;
	var effort = Math.floor(Math.random()*(12));

	if (effort < 10){
		var agonise = Math.floor(Math.random()*(10));
		snarkResponse = ['yup', 'yep', 'mhm', 'mhmmm', 'cute', 'nice', 'yay', 'yaaay', 'ayup', 'yah'];
		shitpost = snarkResponse[agonise];
		spicybot.say(config.channels[0], shitpost);
	} else if (effort == 10){
		getClickbait.amazon(function(link){spicybot.say(config.channels[0], link)});
		shitpost = "amazon link";	
	} else if (effort == 11){
		getClickbait.britProb(function(link){spicybot.say(config.channels[0], link)});
		shitpost = "reddit britprob link";	
	} else {
		getClickbait.waitrose(function(link){spicybot.say(config.channels[0], link)});
		shitpost = "waitrose link (because sainsburys website no likey being scraped)";
	}

	var messagetime = new Date().toISOString();
	console.log(messagetime + ': spicybot said ' + shitpost);
};

spicybot.addListener('message', function(from, to, text, message) {
		curMsg = text;
		var inMsg = text;
		var _this = this;
		setTimeout( function(){_this.ifQuiet(inMsg, curMsg);}, spicybot.masturbate());
});

