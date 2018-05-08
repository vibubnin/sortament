const express = require("express");


const fileUpload = require('express-fileupload');
const port = 8000;
const mongoose = require('mongoose');
const routes = require('./routes');

let app = express();

app.use(fileUpload());

app.use('/', routes);
 
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => { 
	console.log(`The Server is running on port ${port}`);
}); 

// app.post('/upload', (req, res) => {
// 	let data = utf8Iconv.convert(req.files.myFileUpload.data).toString();
// 	//console.log(data);
// 	res.send(data);
// });
