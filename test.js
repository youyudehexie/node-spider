
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback (err) {
	console.log('ok')
  // yay!
});

var kittySchema = mongoose.Schema({
    name: String
})

var Kitten = mongoose.model('Kitten', kittySchema)

var silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'