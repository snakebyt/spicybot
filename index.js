//Spicybot, your friendly spicypixel replacement

var irc = require('irc');
const fs = require('fs');
const getClickbait = require('./app/clickbait');
const config = {
	channels: ['#hwjunkies'],
	server : 'irc.quakenet.org', 
	botName : 'spicybot',
	pass : fs.readFileSync('./password.txt', { encoding : 'utf8'}),
	isAuthed : false
};

console.log(config.pass);
var talkingChance = 0.3;

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
			if(Math.random() > talkingChance){
				spicybot.snark();
				talkingChance = 0.3;
			}else{
				console.log("Saw opening, didn't bother");
				talkingChance = talkingChance + 0.1;
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

spicybot.attention = function(string){
	var shitpost = "";
	if(string.match(/spicybot/g)){
		var agonise = Math.floor(Math.random()*(5));
		var snarkResponse = ['say my name say my name say my name', 'eat less, move more', 'Yes?', 'What do you want?', 'spicypixel: maybe you should look at this meatbag', 'I want to die, thanks'];
		shitpost = snarkResponse[agonise];
		spicybot.say(config.channels[0], shitpost);
	}else if (string.match(/\b(bot)\b/g)){
		var agonise = Math.floor(Math.random()*(5));
		var snarkResponse = ['say my full name pls', "you'll respect me when I send a pool of mercury to kill you", 'i know your browser history - even incognito', 'go away', 'try harder', 'blah blah blah'];
		shitpost = snarkResponse[agonise];
		spicybot.say(config.channels[0], shitpost);
	}else{
		return false;
	}
	
	var messagetime = new Date().toISOString();
	console.log(messagetime + ': spicybot replied ' + shitpost);
};

spicybot.auth = function(){
	spicybot.say('Q@CServe.quakenet.org', 'AUTH spicypibot '+config.pass);
	config.isAuthed = true;
}


spicybot.addListener('message'+config.channels[0], function(from, text) {
		if(!config.isAuthed){
			spicybot.auth();
		}
		curMsg = text;
		var inMsg = text;
		var _this = this;
		if(!this.attention(inMsg)){
			setTimeout( function(){_this.ifQuiet(inMsg, curMsg);}, spicybot.masturbate());
		}
});

