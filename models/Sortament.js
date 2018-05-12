const mongoose = require('mongoose');

const sortamentSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  standart: { type: String, required: true },
  photo:    { type: String, default: '' },
  params: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Param' }],
  data:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Data' }]
}, { versionKey: false });

module.exports = mongoose.model('Sortament', sortamentSchema);