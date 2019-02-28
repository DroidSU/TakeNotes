module.exports = (app) => {
  const note = require('../controllers/note.controllers.js')

  // Creates a new note
  app.post('/notes', note.create)

  // Retrieve all notes
  app.get('/notes', note.findAll)

  // Retrieve a single note with note id
  app.get('/notes/:noteId', note.findOne)

  // Update a single note with note id.
  app.put('/notes/:noteId', note.update)

  // Delete a note with note id.
  app.delete('/notes/:noteId', note.delete)
}
