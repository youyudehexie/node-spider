var async = require('async');
var tiebaIndex = require('./scheduler/tiebaIndex');


var task = [tiebaIndex]

async.forEachSeries(task, function(fn ,callback){
	if( typeof(fn) == 'function'){
		f  = new fn();
		f.start_request()	
	}
	callback(null);
},function(err){
	console.log('fin');
});


/*

var spider = new tiebaIndex()
spider.start_request()
*/

/*
var urllib = require('urllib');
var iconv = require('iconv-lite');
var util = require("util");
var events = require("events");
var cheerio = require('cheerio');

var Article = require('./pipe').Article;
var async = require('async');
*/

/*
var NodeSpider = require('./lib/nodeSpider');

//var nodeSpider = new NodeSpider();


function TiebaSpider(){
	NodeSpider.call(this);
	//return this
}

util.inherits(TiebaSpider, NodeSpider);


var url = 'http://tieba.baidu.com/f?kw=%E5%8D%8E%E5%8D%97%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6'

var tiebaSpider = new TiebaSpider()
tiebaSpider.start_request(url)
*/
//privite


/*

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

var spider = new NodeSpider();



spider.on("download", function(url){
	var self = this;

	var args = {
		type: 'get',
		decode: 'gbk'
	};

	_request(url, args, function(err, response){
		if(err) return self.emit('error', err);
		self.emit('parse', response);
	});

});



spider.on('parse', function(response){
	console.log(response);
	var self = this;
	var $ = cheerio.load(response); 

	var items = [];
	$('.threadlist_text.threadlist_title.j_th_tit.notStarList ').find('a').each(function(i, item){
		if(item.attribs.title && item.attribs.href){
			var articles = {};
			articles.title = item.attribs.title;
		 	articles.path = item.attribs.href;
		 	items.push(articles);
		}
	})

	self.emit('pipe', items);
})

spider.on('error', function(err){
	console.log(err);
})



spider.on('pipe', function(items){
	var self = this;

	async.forEach(items, function(item, callback){
		var url = item.path.split('/')[2]
		var where = {
			url: url
		}

		Article.getArticle(url, function(err, article){
			if(err) return callback(err);

			if(!article) {
				var newArticle = {
					title: item.title,
					url: url
				};

				return Article.createArticle(newArticle, callback);
			} 

			return callback(null);

		})

	},function(err){
		if(err) {
			return self.emit('error', err);
		}
	});

})



var url = 'http://tieba.baidu.com/f?kw=%E5%8D%8E%E5%8D%97%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6'
spider.start_request(url);
*/

/*
var headers = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31'
}
var args = { type: 'get', data: data,  headers: headers};

urllib.request(url, args, function (err, data, res) {
  console.log(res.statusCode);
  console.log(res.headers);
  str = iconv.decode(data, 'utf-8');
  console.log(str);

});
*/