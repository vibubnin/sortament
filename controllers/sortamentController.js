const mongoose = require('mongoose');
const Sortament = require('../models/Sortament');

exports.createSortament = (req, res) => {
  let oSortament = {
    name: req.body.name,
    standart: req.body.standart,
    photo: req.body.photo,
    params: [],
    data: req.body.rows
  }; 

  req.body.columns.forEach((oColumn) => {
    oSortament.params.push(oColumn._id);
  });

  Sortament.create(oSortament, (err, oNewSortament) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    res.json(oNewSortament);
    console.log(`Создан новый сортамент: \n ${oNewSortament._id}`);
  });
};

exports.getSortaments = (req, res) => {
  Sortament
    .find({})
    .populate('params')
    .exec((err, sortaments) => {
      if (err) {
        res.status(500);
        res.json({ message: { level: 'error', text: err.message } });
        console.log(err);
      }
  
      res.json(sortaments);
    });
};

exports.getSortament = (req, res) => {
  Sortament
    .findById(req.query.id)
    .populate('params')
    .exec((err, sortament) => {
      if (err) {
        res.status(500);
        res.json({ message: { level: 'error', text: err.message } });
        console.log(err);
      }
  
      res.json(sortament);
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