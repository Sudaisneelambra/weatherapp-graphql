const mongoose = require('mongoose')
const selectedplace = new mongoose.Schema({
  placename: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('place', selectedplace);