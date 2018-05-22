const express = require("express"),
			bodyParser = require('body-parser'),
			fileUpload = require('express-fileupload'),
			port = 8000,
			mongoose = require('mongoose');

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
	})
};

const dbConnect = () => {
	mongoose.connect('mongodb://localhost/sortament');
	return mongoose.connection;
};

dbConnect()
	.on('error', err => { console.log('Error connection \n', err); })
	.once('open', startServer);