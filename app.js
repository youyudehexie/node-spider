var urllib = require('urllib');
var iconv = require('iconv-lite');

var url = 'http://tieba.baidu.com/f?kw=%E5%8D%8E%E5%8D%97%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6'

urllib.request(url, function (err, data, res) {
  console.log(res.statusCode);
  console.log(res.headers);
  str = iconv.decode(data, 'gbk');
  console.log(str);

});