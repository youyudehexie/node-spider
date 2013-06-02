var NodeSpider = require('../lib/nodeSpider');
var util = require("util");
var Spider = require('../spiders').tiebaIndex;
var Downloader = require('../downloader').Common;
var ItemPipe = require('../pipe').tiebaIndex;


function TiebaIndexSpider(){
	NodeSpider.call(this);
	//return this
}

util.inherits(TiebaIndexSpider, NodeSpider);

var p = TiebaIndexSpider.prototype;

p.start_request = Spider.start_request;

p.on('download', Downloader.download);
p.on('parse', Spider.parse);
p.on('pipe', ItemPipe.pipe);

var indexSpider = new TiebaIndexSpider()


var url = 'http://tieba.baidu.com/f?kw=%E5%B9%BF%E4%B8%9C%E5%B7%A5%E4%B8%9A%E5%A4%A7%E5%AD%A6'

indexSpider.start_request(url)

//var tiebaSpider = new tiebaIndexSpider()


//var p = tiebaSpider.prototype

//var p = TiebaSpider.prototype;
//tiebaSpider.start_request(url)

/*
p.start_request = function(url){
	spider.start_request()
};*/
//tiebaSpider.start_request(url)
