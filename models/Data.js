const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  sortament_id:     { type: mongoose.Schema.Types.ObjectId, ref: 'Sortament'},
  values: {}
});

module.exports = mongoose.model('Data', dataSchema);