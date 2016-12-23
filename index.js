//Spicybot, your friendly spicypixel replacement

const irc = require('irc');
const fs = require('fs');

const config = {
	channels: ['#leeistesting123'],
	server : 'irc.quakenet.org', 
	botName : 'spicybot'
};

var spicybot = new irc.Client(config.server, config.botName, {
	channels : config.channels
});

spicybot.prototype.masturbate = function(){
	grip = Math.floor(Math.random()*6)+1;
	lube = grip*1000;
	smeg = lube*60;
	return smeg;
};

spicybot.prototype.seeIfMissed = function(initMsg){
	fs.readFile('curMsg.txt', (err, curMsg) => {
		if (err) throw err;
		if (curMsg === initMsg){
			spicybot.snark();
		}else{
			//sulk
		}
	}
};

spicybot.prototype.snark = function(){
	debate = Math.floor(Math.random()*(10));
	snarkResponse = ['yup', 'yep', 'mhm', 'mhmmm', 'cute', 'nice', 'yay', 'yaaay', 'ayup', 'yah'];
	spicybot.say(config.channels[0], snarkResponse[debate]);

};

spicybot.addListener('message', function(from, to, text, message) {
	fs.writeFile('curMsg.txt', message, (err) => {
		if (err) throw err;
		setTimeout( spicybot.seeIfMissed(message), spicybot.masturbate());
	});
});
