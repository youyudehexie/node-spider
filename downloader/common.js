var urllib = require('urllib');
var iconv = require('iconv-lite');

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

exports.download = function(url){
	var self = this;

	var args = {
		type: 'get',
		decode: 'gbk'
	};
	_request(url, args, function(err, response){
		if(err) return self.emit('error', err);
		self.emit('parse', response);
	});
}