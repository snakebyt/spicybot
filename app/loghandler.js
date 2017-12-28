// Handle logging
// Replace the util.log and console.error functions to use the logging library

var Log = require('log'), 
    log = new Log('debug');
var util = require('util');

util.log = function(string) {
    log.debug(string);
}

// The console.error's from the IRC lib are not really errors
var console = require('console');
console.error = function (string) {
    log.debug(string);
}

module.exports = log;