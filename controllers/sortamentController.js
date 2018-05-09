const mongoose = require('mongoose');
const Sortament = require('../models/Sortament');

exports.createSortament = (req, res) => {
  Sortament.create(req.body, (err, newSortament) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(newSortament);
    console.log(`Создан новый сортамент: \n ${newSortament}`);
  });
};

exports.getSortaments = (req, res) => {
  Sortament.find({}, (err, sortaments) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(sortaments);
  });
};

exports.updateSortament = (req, res) => {
  Sortament.findByIdAndUpdate(req.body.id, req.body.data, {new: true}, (err, updatedSortament) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(updatedSortament);
    console.log(`Изменен сортамент: \n ${updatedSortament}`);
  });
};

exports.deleteSortament = (req, res) => {
  Sortament.findByIdAndRemove(req.body.id, (err, deletedSortament) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(deletedSortament);
    console.log(`Удален сортамент: \n ${deletedSortament}`);   
  });
};