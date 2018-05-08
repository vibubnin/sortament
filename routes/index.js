const express = require('express');
const Iconv  = require('iconv').Iconv;
const utf8Iconv = new Iconv('windows-1251', 'utf-8');
const router = express.Router();

const paramController = require('../controllers/paramController');

router.route('/api/sortaments')
	.get((req, res) => {})
	.post((req, res) => {})
	.put((req, res) => {})
	.delete((req, res) => {});

router.route('/api/params')
	.get((req, res) => {})
	.post(paramController.createParam)
	.put((req, res) => {})
	.delete((req, res) => {});

router.route('/api/data')
	.get((req, res) => {})
	.post((req, res) => {})
	.put((req, res) => {})
	.delete((req, res) => {});

router.route('/api/uploadFile')
	.post((req, res) => {
		let data = utf8Iconv.convert(req.files.myFileUpload.data).toString();
		//console.log(data);
		res.send(data);
	});

module.exports = router;