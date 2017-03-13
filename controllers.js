var models = require('./models');

var controllers = new Object();

controllers.pages = function() {

	this.index = function(req, res) {
		res.render('index', {title: "MyFirstVue"});
	}

	this.news = function(req, res) {
		res.render('news', {title: "Новости"});
	}



}

controllers.news = function() {
	this.getAllNews = function(req, res) {
		models.news.getAllNews(function(err, rows) {
			if(!err) {
				res.end(JSON.stringify(rows));
			}
		});
	}

	this.deleteNews = function(req, res) {
		var id = req.body.id;
		models.news.deleteNews(id, function(err) {
			if(!err) {
				res.end(JSON.stringify({status: "ок"}));
			} else {
				console.log(err);
			}
		});
	}

	this.addNews = function(req, res) {
		var text = req.body.text;
		var subject = req.body.subject;
		models.news.addNews({text:text, subject:subject}, function(err, row) {
			models.news.getNews(row.insertId, function(err, row){
				if(!err) {
					res.end(JSON.stringify(row));
				} else {
					console.log(err);
				}
			});
		});
	}

	this.updateNews = function(req, res) {
		var news_obj = req.body.news_obj;
		models.news.updateNews(news_obj, function(err) {
			if(!err) {
				res.end(JSON.stringify({status: "ок"}));
			} else {
				console.log(err);
			}
		});
	}
}


/*this.getAllNews = function(req, res) {
		var news = models.news;
		news.getAllNews(function(err, news) {
			if(!err) {
				res.render('news/all', {news: news, title: "Новости"});
			}
		});
	};

	this.addNews = function(req, res) {
		var subject = req.body.subject;
		var text = req.body.text;

		var news = models.news;

		news.addNews({subject: subject, text: text}, function(err) {
			res.end(JSON.stringify({status: "success"}));
		});
	}
*/

module.exports = controllers;
