var Article = require('../models').Article;
var async = require('async');

exports.pipe = function(items){
	console.log('pipe')
	var self = this;

	async.forEach(items, function(item, callback){
		var url = item.path.split('/')[2]
		var where = {
			url: url
		}

		getArticle(where, function(err, article){
			if(err) return callback(err);

			if(!article) {
				var newArticle = {
					title: item.title,
					url: url
				};

				return createArticle(newArticle, callback);
			} 

			return callback(null);

		})

	},function(err){
		if(err) {
			return self.emit('error', err);
		}
	});
};

var createArticle = function(_article, callback){
	var article = new Article(_article);
	console.log(_article.title);
  article.save(callback);
};

var getArticle = function(_where, callback){
	Article.findOne(_where, callback);
};