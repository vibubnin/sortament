const express = require("express");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const port = 8000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const startServer = () => {
	const app = express();
	const routes = require('./routes');

	app.use( express.static(`${__dirname}/public`) );
	app.use( fileUpload() );
	app.use( bodyParser.json() );
	app.use( bodyParser.urlencoded({ extended: true }) );
	app.use('/', routes);

  app.listen(port, () => {
		console.log(`Server started on port ${port}`)
	}) // => use callback function
};

const dbConnect = () => {
	mongoose.connect('mongodb://localhost/sortament');

	return mongoose.connection;
};

dbConnect()
	.on('error', err => { console.log('Error connection \n', err); })
	.once('open', startServer);