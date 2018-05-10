const mongoose = require('mongoose');
const Data = require('../models/Data');

exports.createData = (req, res) => {
  Data.create(req.body, (err, newData) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(newData);
    console.log(`Создана строка данных: \n ${newData}`);
  });
};

exports.getData = (req, res) => {
  Data.find({}, (err, data) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(data);
  });
};

exports.updateData = (req, res) => {
  Data.findByIdAndUpdate(req.body.id, req.body.data, {new: true}, (err, updatedData) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(updatedData);
    console.log(`Изменена строка данных: \n ${updatedData}`);
  });
};

exports.deleteData = (req, res) => {
  Data.findByIdAndRemove(req.body.id, (err, deletedData) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(deletedData);
    console.log(`Удален сортамент: \n ${deletedData}`);   
  });
};