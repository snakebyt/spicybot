// britprob.js - for scraping british problems for links

const request = require('request');
const cheerio = require('cheerio');
module.exports = {
waitrose : function(callback){
	var links = [];
	request('http://www.waitrose.com/shop/Browse/Offers/Fresh_and_Chilled/Fresh_Meat', function (error, response, body){
		if(!error && response.statusCode === 200){
			var $ = cheerio.load(body);
			$('a.m-product-open-details').each(function(){
				links.push($(this).attr('href'));
			});
			callback('http://www.waitrose.com' + links[Math.floor(Math.random()*links.length)]);
		}else{
			callback("Waitrose is down :(");
		}
	});
},


britProb : function(callback){
	var links = [];
	request('https://www.reddit.com/r/britishproblems/', function (error, response, body){
		if(!error && response.statusCode === 200){
			var $ = cheerio.load(body);
			$('a.title').each(function(){
				links.push('https://www.reddit.com' + $(this).attr('href'));
			});
			callback(links[Math.floor(Math.random()*8)]);
		}else{
			calllback("Reddit is down :(");
		}
	});
},
amazon : function(callback){
	var links = [];
	request('https://www.amazon.co.uk/Best-Sellers-Electronics-Computer-Accessories-Peripherals/zgbs/electronics', function (error, response, body){
		if(!error && response.statusCode === 200){
			var $ = cheerio.load(body);
			$('.a-section > .a-link-normal').each(function(){
				links.push('https://www.amazon.co.uk' + $(this).attr('href'));
			});
			callback(links[Math.floor(Math.random()*20)]);
		}else{
			calllback("Amazon is down :(");
		}
	});
}
};
