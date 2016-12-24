//Spicybot, your friendly spicypixel replacement

var irc = require('irc');
const fs = require('fs');
const getClickbait = require('./app/clickbait');
const config = {
	channels: ['#hwjunkies'],
	server : 'irc.quakenet.org', 
	botName : 'spicypibot'
};

var spicybot = new irc.Client(config.server, config.botName, {
	channels : config.channels
});

spicybot.masturbate = function(){
	grip = Math.floor(Math.random()*8)+5;
	lube = grip*1000;
	smeg = lube*60;
	return smeg;
};

spicybot.ifQuiet = function(initMsg){
	fs.readFile('curMsg.txt', 'utf8',(err, curMsg) => {
		if (err) throw err;
		if (curMsg === initMsg){
			spicybot.snark();
		}else{
			//sulk
		}
	});
};

spicybot.snark = function(){

	var shitpost;
	var effort = Math.floor(Math.random()*(11));

	if (effort < 8){
		var agonise = Math.floor(Math.random()*(10));
		snarkResponse = ['yup', 'yep', 'mhm', 'mhmmm', 'cute', 'nice', 'yay', 'yaaay', 'ayup', 'yah'];
		shitpost = snarkResponse[agonise];
		spicybot.say(config.channels[0], shitpost);
	} else if (effort < 10){
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
	var inMsg = text;
	fs.writeFile('curMsg.txt', inMsg, (err) => {
		if (err) throw err;
		var _this = this;
		setTimeout( function(){_this.ifQuiet(inMsg);}, spicybot.masturbate());
	});
	return;
});
