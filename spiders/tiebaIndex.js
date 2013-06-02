var cheerio = require('cheerio');
var config = require('../config').config.tieba;

exports.start_request = function(url){
	console.log('start_request');
	var page = config.page;
	var name = config.name;

	for(var i=0; i < page; i++){
		var url = 'http://tieba.baidu.com/f?kw=' + name + '&pn=' + page*50;
		this.emit("download", url);
	}
//	var url = 'http://tieba.baidu.com/f?kw=%E5%B9%BF%E4%B8%9C%E5%B7%A5%E4%B8%9A%E5%A4%A7%E5%AD%A6'
//	console.log(config.tieba);
	//this.emit("download", url);
};

exports.parse = function(response){
	console.log('parse');
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
};