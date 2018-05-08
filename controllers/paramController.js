const mongoose = require('mongoose');
const Param = require('../models/Param');

exports.createParam = (req, res) => {
  Param.create(req.body, (err, newParam) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    }

    res.json({ 
      message: { level: 'success', text: 'Параметр успешно создан' }, 
      result: category 
    });
    
    console.log(`Создан новый параметр: \n ${new_param}`);
  });
};

exports.getParams = (req, res) => {
  Param.find({}, (err, params) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    }

    res.json(params);
  });
};

// exports.updateParam = (req, res) => {
//   Param.findByIdAndUpdate(req.body.id, (err, params) => {
//     if (err) {
//       res.sendStatus(500);
//       console.log(err);
//     }

//     res.json(params);
//   });
// };

