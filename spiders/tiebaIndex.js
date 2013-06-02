var cheerio = require('cheerio');

exports.start_request = function(url){
	console.log('start_request');
	this.emit("download", url);
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