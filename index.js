//Spicybot, your friendly spicypixel replacement

var irc = require('irc');
const fs = require('fs');

const config = {
	channels: ['#leeistesting123'],
	server : 'irc.quakenet.org', 
	botName : 'spicybot'
};

var spicybot = new irc.Client(config.server, config.botName, {
	channels : config.channels
});

spicybot.masturbate = function(){
	grip = Math.floor(Math.random()*10)+5;
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
	debate = Math.floor(Math.random()*(10));
	snarkResponse = ['yup', 'yep', 'mhm', 'mhmmm', 'cute', 'nice', 'yay', 'yaaay', 'ayup', 'yah'];
	spicybot.say(config.channels[0], snarkResponse[debate]);
	var messagetime = new Date().toISOString();
	console.log(messagetime + ': spicybot said ' + snarkResponse[debate]);
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
