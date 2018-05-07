const express = require("express");
const Iconv  = require('iconv').Iconv;
const utf8Iconv = new Iconv('windows-1251', 'utf-8');
const fileUpload = require('express-fileupload');
const iPort = 8000;

let app = express();
 
app.use(express.static(__dirname + "/public"));

app.use(fileUpload());

app.post('/upload', (req, res) => {
	let data = utf8Iconv.convert(req.files.myFileUpload.data).toString();
	//console.log(data);
	res.send(data);
});

app.listen(iPort, () => { 
	console.log('The Server is running on port ' + iPort);
}); 