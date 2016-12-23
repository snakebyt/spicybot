//Spicybot, your friendly spicypixel replacement

const irc = require("irc");

const config = {
	channels: ['#leeistesting123'],
	server : 'irc.quakenet.org', 
	botName : 'spicybot'
};

var spicybot = new irc.Client(config.server, config.botName, {
	channels : config.channels
});

spicybot.addListener('message', function(from, to, text, message) {
	spicybot.say(config.channels[0], "Hello friend");
});
