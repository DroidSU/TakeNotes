const Note = require('../models/note.model.js')

// Create and save a new node.
exports.create = (req, res) => {
  // Validate the request.
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Note content cannot be empty'
    })
  }

  // Create the note if validation passes
  const note = new Note({
    title: req.body.title || 'Untitled Note',
    content: req.body.content,
    genre: req.body.genre
  })

  // Save note in the database
  note.save()
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).send({
        message: error.message || 'Some error occurred while creating the note.'
      })
    })
}

// Retrieve all notes from the database
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes)
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving'
      })
    })
}

// Find a single note with noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(400).send({
          message: 'Note not found with id: ' + req.params.noteId
        })
      }

      return res.send(note)
    })
    .catch(error => {
      if (error.kind === 'ObjectId') {
        return res.send(400).send({
          message: 'Note not found with id: ' + req.params.noteId
        })
      }

      return res.send(500).send({
        message: 'Error updating note with noteId ' + req.params.noteId
      })
    })
}

// Update a note IDENTIFIED BY THE NOTE ID.
exports.update = (req, res) => {
  // Validate the request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Note content cannot be empty'
    })
  }

  if (!req.body.genre) {
    return res.status(400).send({
      message: 'Note genre must be specified'
    })
  }

  // Find note and update it with the request body.
  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || 'Untitled note',
    content: req.body.content,
    genre: req.body.genre
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.send(400).send({
          message: 'Note not found with id: ' + req.params.noteId
        })
      }
    })
    .catch(error => {
      if (error.kind === 'ObjectId') {
        return res.send(400).send({
          message: 'Note not found with id: ' + req.params.noteId
        })
      }

      return res.send(500).send({
        message: 'Error updating note with noteId ' + req.params.noteId
      })
    })
}

// Delete a note IDENTIFIED BY THE NOTE ID.
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id: ' + req.params.noteId
        })
      }

      res.send({
        message: 'Note deleted Successfully'
      })
    })
    .catch(error => {
      if (error.kind === 'ObjectId' || error.name === 'NotFound') {
        return res.status(400).send({
          message: 'Note not found with id: ' + req.params.noteId
        })
      }

      return res.status(500).send({
        message: 'Could not delete note with noteId ' + req.params.noteId
      })
    })
}
