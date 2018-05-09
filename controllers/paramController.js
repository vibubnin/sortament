const mongoose = require('mongoose');
const Param = require('../models/Param');

exports.createParam = (req, res) => {
  Param.create(req.body, (err, newParam) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(newParam);
    console.log(`Создан новый параметр: \n ${new_param}`);
  });
};

exports.getParams = (req, res) => {
  Param.find({}, (err, params) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(params);
  });
};

exports.updateParam = (req, res) => {
  Param.findByIdAndUpdate(req.body.id, req.body.data, {new: true}, (err, updatedParam) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(updatedParam);
    console.log(`Изменен параметр: \n ${updatedParam}`);
  });
};

exports.deleteParam = (req, res) => {
  Param.findByIdAndRemove(req.body.id, (err, deletedParam) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(deletedParam);
    console.log(`Удален параметр: \n ${deletedParam}`);   
  });
};

