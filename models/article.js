var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: { type: String },
  url: { type: String },
  content: { type: String },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('Article', ArticleSchema);
