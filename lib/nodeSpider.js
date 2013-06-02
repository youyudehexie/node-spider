var urllib = require('urllib');
var iconv = require('iconv-lite');
var util = require("util");
var events = require("events");
var cheerio = require('cheerio');

//console.log(urllib);

//privite
var _request = function(url, args, callback){
	var _headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31'
	};

	args.headers = _headers;
	var _decode = args.decode || 'utf-8';

	urllib.request(url, args, function (err, data, res) {
	  response = iconv.decode(data, _decode);
	  callback(err, response);
	});
}

function NodeSpider(){
	events.EventEmitter.call(this);
}

util.inherits(NodeSpider, events.EventEmitter);

var p = NodeSpider.prototype

p.start_request = function(url){
	this.emit("download", url);

}

/*
p.on("download", function(url){
	var self = this;

	var args = {
		type: 'get',
		decode: 'gbk'
	};

	console.log('fuck');
	_request(url, args, function(err, response){
		console.log(response);
		if(err) console.log(err);
		self.emit('parse', response);
	});

});


var spider = new NodeSpider();
var url = 'http://tieba.baidu.com/f?kw=%E5%8D%8E%E5%8D%97%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6'

spider.start_request(url)
*/


module.exports = NodeSpider;