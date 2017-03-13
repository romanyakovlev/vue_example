var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controllers = require('./controllers');

var pages = new controllers.pages();
var news = new controllers.news();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.get('/', pages.index);

router.get('/news', pages.news);

router.get('/getAllNews', news.getAllNews);

router.post('/deleteNews', news.deleteNews);

router.post('/addNews', news.addNews);

router.post('/updateNews', news.updateNews);


module.exports = router;
