

var request = require('request');
var cheerio = require('cheerio');
var array_of_news_match = [];
var array_of_news_sports = [];  

//парсим sovsport.ru
request('http://www.sovsport.ru/news/', function (error, response, html){
	if (error)
		throw error;

	if ( response.statusCode !== 200 )
		return console.log('incorrect statusCode: ', response.statusCode);

	var $ = cheerio.load(html);

	
	$('.type').each(function(i, element){ // sports.ru
		var obj_tag_title = {} //объект => категория новости + заголовок
		obj_tag_title.tag = $(element).text().trim(); // категория
		//obj_tag_title.link = $('a', element).prev().attr('href'),
		obj_tag_title.title = $(element).prev().text().trim(); // заголовок
		array_of_news_sports.push(obj_tag_title); // наполняем массив объектами
	});
	//console.log(array_of_news_sports);
});

//парсим matchtv.ru
request('http://www.matchtv.ru/', function (error, response, html){
	if (error)
		throw error;

	if ( response.statusCode !== 200 )
		return console.log('incorrect statusCode: ', response.statusCode);

	var $ = cheerio.load(html);
	
	// массив новостей match
	
	$('.news-category').each(function(i, element){ // matchtv.ru
		var obj_tag_title = {} //объект => категория новости + заголовок
		obj_tag_title.tag = $(element).text().trim(); // категория
		
		obj_tag_title.title = $(element).next().text().trim();
		//obj_tag_title.link = $(element).next().attr('href'),// заголовок
		array_of_news_match.push(obj_tag_title); // наполняем массив объектами
	});
	//console.log(array_of_news_match);
});

module.exports.array_of_news_match = array_of_news_match;
module.exports.array_of_news_sports = array_of_news_sports;

//парсим сайт по url и классуначального элемента блока новостей, который интересует
// var news = function parsingSite(url_site, class_of_parsing_block){
// 		request(url_site, function (error, response, html) {
	 
// 		  if (error)
// 		    throw error;

// 		  if ( response.statusCode !== 200 )
// 		    return console.log('incorrect statusCode: ', response.statusCode);

// 		  var $ = cheerio.load(html);
// 		  var type_cont = [];

// 	       $(class_of_parsing_block).each(function(i, element) {
// 			    //if ($(element).text().trim() == sport){
// 			    	var obj = {};
// 			    	obj.type = $(element).text().trim();
			    	
// 			    	if (url_site === 'http://www.sports.ru/') { //здесь костыль, но он пока не принципиален. 
// 			    		obj.content = $(element).next().next().text().trim();
// 			    	}else
// 			    		obj.content = $(element).next().text().trim();
			    	
// 			    	type_cont.push(obj);
// 			    	//console.log(type_cont);
// 			    	return type_cont; 
// 			});
// 	    })
// }



// exports.news = news;



