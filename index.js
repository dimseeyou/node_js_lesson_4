var express = require('express');
var bodyParser = require('body-parser');
var template = require('consolidate').handlebars;
var parser = require('./parser');
var app = express();
var port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

app.engine('hbs', template);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  res.send( getForm() );
});

var getForm = function () { //форма пост, которая перенаправляет на news.hbs
  return '<form action="/news" method="post">'+
  '<p>Choose site</p>' +
    '<select name="res" />'+
      '<option value="1" >'+'sovsport.ru'+'</option>'+
      '<option value="2" >'+'matchtv.ru'+'</option>'+
    '</select>'+
    '<p><input type = "submit"/><p>'
  '</form>';
};

app.post('/news', (req, res) =>{

    var resId = req.body.res;

    if (resId === '1'){    
        res.render('news', {
            pageTitle:'Советский спорт',
            sovsport: true,  
            data: parser.array_of_news_sports
        });
    }
    if (resId === '2'){
        res.render('news', {
            pageTitle: 'Матч ТВ',
            matchtv:true,
            data: parser.array_of_news_match
        });
    }
   
});

app.listen(port, () => {
    console.log('Lets start on server ' +port);
});

