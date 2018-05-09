const express = require('express');
const Iconv  = require('iconv').Iconv;
const utf8Iconv = new Iconv('windows-1251', 'utf-8');
const router = express.Router();

const paramController = require('../controllers/paramController');
const sortamentController = require('../controllers/sortamentController');

const api = {
  path: '/api/',
  collection: {
    sortaments: 'sortaments',
    params: 'params',
    data: 'data'
  }
};

router.route(api.path + api.collection.sortaments)
	.get(sortamentController.getSortaments)
	.post(sortamentController.createSortament)
	.put(sortamentController.updateSortament)
	.delete(sortamentController.deleteSortament);

router.route(api.path + api.collection.params)
	.get(paramController.getParams)
	.post(paramController.createParam)
	.put(paramController.updateParam)
	.delete(paramController.deleteParam);

router.route(api.path + api.collection.data)
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