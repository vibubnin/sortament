const mongoose = require('mongoose');
const Sortament = require('../models/Sortament');
const Data = require('../models/Data');

exports.createSortament = (req, res) => {
  console.log(Sortament, mongoose.Types.ObjectId);

  let oData = {
    name: req.body.name,
    standart: req.body.standart,
    photo: req.body.photo,
    params: [],
    data: []
  }; 

  req.body.columns.forEach((oColumn) => {
    oData.params.push( new mongoose.Types.ObjectId(oColumn._id) );
  });

  let oSortament = new Sortament(oData);

  let aRows = [];

  req.body.rows.forEach((oRow) => {
    aRows.push({
      sortament_id: oSortament._id,
      values: oRow
    });
  });

  Data.create(aRows, (err, aData) => {
    if (err) {
      res.status(500);
      res.json({ message: { level: 'error', text: err.message } });
      console.log(err);
    }

    console.log(`Создан новые данные: \n ${aData}`);

    aData.forEach((oData) => {
      oSortament.data.push( oData._id );
    });

    // for (let i = 1; i < arguments.length; i++) {
    //   oSortament.data.push( arguments[i]._id );
    // }

    oSortament.save((err) => {
      if (err) {
        res.status(500);
        res.json({ message: { level: 'error', text: err.message } });
        console.log(err);
      }

      res.json(oSortament);
      console.log(`Создан новый сортамент: \n ${oSortament}`);
    });


  });

};

exports.getSortaments = (req, res) => {
  Sortament
    .find({})
    .populate('Param')
    .populate('Data')
    .exec((err, sortaments) => {
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