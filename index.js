//Spicybot, your friendly spicypixel replacement

var log = require('./app/loghandler');
var irc = require('irc');
const fs = require('fs');
const getClickbait = require('./app/clickbait');
const config = JSON.parse(fs.readFileSync('./config.json',
    { encoding : 'utf8'}
));
config.channels = [config.channel];

var talkingChance = initialTalkingChance = 0.3;

var curMsg = "kjasdasndoapifjferiwejfnqwkmwe";

log.info('Starting bot');

// Establish an IRC connection
var spicybot = new irc.Client(config.server, config.botName, {
    channels : config.channels,
    debug: config.debug 
});

// Send all errors to logging library
spicybot.addListener('error', function (message) {
    log.error('Error from IRC client: %s', message);
});

// Test if a string contains a news link
spicybot.isNewsLink = function (string) {
    var sites = [
        'bbc.co.uk/news/',
        'news.sky.com',
        'theguardian.com',
        'independent.co.uk',
        'dailymail.co.uk'
    ];
    
    for (i = 0; i < sites.length; i++) {
        if (string.indexOf(sites[i]) >= 0) {
            log.debug('News link found in message');
            return true;
        }
    }

    return false;
}

// Generate a random sleep interval
spicybot.masturbate = function () {
    grip = Math.floor(Math.random()*8)+5;
    lube = grip*1000;
    smeg = lube*60;
    return smeg;
};

// If there is no activity in the channel, then there's a chance we can talk
spicybot.ifQuiet = function (initMsg, currentMsg) {
    if (currentMsg === initMsg) {
        if (Math.random() <  talkingChance) {
            talkingChance = initialTalkingChance;
            log.info('Talking in %s due to inactivity ' + 
                'and setting chance back to %s',
                config.channel,
                (talkingChance * 100) + '%'
            );
            spicybot.snark();
        } else {
            talkingChance = talkingChance + 0.1;
            log.debug("Didn't take chance to talk in idle channel, " +
                'increasing chance to %s',
                (talkingChance * 100) + '%'
            );
        }
    } else {
        //sulk
    }
};

// Send a reply on a quiet channel
spicybot.snark = function () {
    var shitpost;
    staticReplies = [
        'yup',
        'yep',
        'mhm',
        'mhmmm',
        'cute',
        'nice',
        'yay',
        'yaaay',
        'ayup',
        'yah'
    ];

    // Give an equal chance at being a static reply or a clickbait response
    var effort = Math.floor(Math.random()*(staticReplies.length + 3));

    if (effort < staticReplies.length) {
        shitpost = staticReplies[effort];
        spicybot.say(config.channel, shitpost);
    } else if (effort == 10){
        getClickbait.amazon(function (link) {
            spicybot.say(config.channel, link);
        });
        shitpost = "amazon link";
    } else if (effort == 11){
        getClickbait.britProb(function (link) {
            spicybot.say(config.channel, link);
        });
        shitpost = "reddit britprob link";
    } else {
        getClickbait.waitrose(function (link) {
            spicybot.say(config.channel, link);
        });
        shitpost = "waitrose link";
    }

    log.info('Took chance to speak in idle channel: %s', shitpost);
};

// Analyse message to see if it is aimed at spicybot
spicybot.attention = function (string) {
    var shitpost = "";
    if (string.indexOf(config.botName) >= 0) {
        var agonise = Math.floor(Math.random()*(5));
        var snarkResponse = [
            'say my name say my name say my name',
            'eat less, move more',
            'Yes?',
            'What do you want?',
            'spicypixel: maybe you should look at this meatbag',
            'I want to die, thanks'
        ];
        shitpost = snarkResponse[agonise];
        log.info('I was focused by name, sending "%s"', shitpost);
        spicybot.say(config.channel, shitpost);
    } else if (string.match(/\b(bot)\b/g)) {
        var agonise = Math.floor(Math.random()*(5));
        var snarkResponse = [
            'say my full name pls',
            "you'll respect me when I send a pool of mercury to kill you",
            'i know your browser history - even incognito',
            'go away',
            'try harder',
            'blah blah blah'
        ];
        shitpost = snarkResponse[agonise];
        log.info('I was focused by "bot", sending "%s"', shitpost);
        spicybot.say(config.channel, shitpost);
    } else if (spicybot.isNewsLink(string) && 
        Math.floor(Math.random()*(5)) == 0) {
        shitpost = 'what a time to be alive';
        spicybot.say(config.channel, shitpost);
    } else {
        return false;
    }
};

// Authenticate with Q if config.pass is defined
spicybot.auth = function () {
    if (typeof(config.pass) !== 'undefined') {
        log.info('Password set in config, authenticating spicybot');
        spicybot.say(
            'Q@CServe.quakenet.org', 
            'AUTH ' + config.user + ' ' + config.pass
        );
    } else {
        log.info('No password set to authenticate, skipping authenticaion');
    }
    config.isAuthed = true;
}

// Listen for messages on primary channel and react
spicybot.addListener('message' + config.channel, function(from, text) {
    if (!config.isAuthed) {
        spicybot.auth();
    }
        
    curMsg = text;
    var inMsg = text;
    var _this = this;
    if(!this.attention(inMsg)){
        setTimeout(function(){
            _this.ifQuiet(inMsg, curMsg);
        }, spicybot.masturbate());
    }
});
