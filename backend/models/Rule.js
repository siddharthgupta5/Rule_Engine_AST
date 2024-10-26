const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  type: String,
  left: { type: mongoose.Schema.Types.Mixed, default: null },
  right: { type: mongoose.Schema.Types.Mixed, default: null },
  value: mongoose.Schema.Types.Mixed,
});

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ruleString: { type: String, required: true }, 
  root: { type: Object, required: true }, 
});

module.exports = mongoose.model('Rule', ruleSchema);
