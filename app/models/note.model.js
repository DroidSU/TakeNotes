const mongoose = require('mongoose')

/* The note model is simple. It contains title content and genre as strings
It also has timestamps set to true. Mongoose uses this to create two new fields - createdAt and updatedAt
 */
const NoteSchema = mongoose.Schema({
  title: String,
  content: String,
  genre: String
}, { timestamps: true })

module.exports = mongoose.model('Note', NoteSchema)
