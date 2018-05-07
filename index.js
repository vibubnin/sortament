var express = require("express");
var app = express();
var Iconv  = require('iconv').Iconv
var utf8Iconv = new Iconv('windows-1251', 'utf-8');
var fileUpload = require('express-fileupload');

app.use(fileUpload());
 
app.use(express.static(__dirname + "/public"));

app.post('/upload', function(req, res) {
	// var columns = req.files
	//     .myFileUpload.data.toString()
	//     .split('\n')[0]
	//     .slice(1)
	//     .split(',');
	var data = utf8Iconv.convert(req.files.myFileUpload.data).toString();
	console.log(data);
	res.send(data);
});

app.listen(8000, function() {
	console.log('Сервер запущен');
}); 