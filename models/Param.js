const mongoose = require('mongoose');

const paramSchema = new mongoose.Schema({
  name:                    { type: String, required: true },
  standart:                { type: String, required: true },
  var_name:                { type: String, default: '' },
  var_index:               { type: String, default: '' },
  unit_fraction:           { type: Boolean, default: 'false' },
  unit_numerator_name:     { type: String, default: '' },
  unit_numerator_degree:   { type: String, default: '' },
  unit_denominator_name:   { type: String, default: '' },
  unit_denominator_degree: { type: String, default: '' }
});

module.exports = mongoose.model('Param', paramSchema);