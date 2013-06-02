var urllib = require('urllib');
var iconv = require('iconv-lite');
var util = require("util");
var events = require("events");
var cheerio = require('cheerio');

var Article = require('./pipe').Article;
var async = require('async');

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
	console.log(this)
}

p.download = function(){
	console.log('download');
	this.on("download", function(url){
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

}

p.parse = function(){
	this.on('parse', function(response){
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
}

p.handleError = function(){
	this.on('error', function(err){
		console.log(err);
	});
}

p.pipeItem = function(){
	this.on('pipe', function(items){
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
			console.log('fin');
		});

	})

}


var spider = new NodeSpider();
var url = 'http://tieba.baidu.com/f?kw=%E5%8D%8E%E5%8D%97%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6'

spider.start_request(url);
/*
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

