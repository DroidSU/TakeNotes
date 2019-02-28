const express = require('express')
const bodyParser = require('body-parser')

// Creates the express app
const app = express()

// Configuring the database
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
// parse requests of content type application/x-www-form-urlencoded

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database')
}).catch((error) => {
  console.log(error.message)
})


app.use(bodyParser.urlencoded({
  extended: true
}))

// parse requests of content type application/json
app.use(bodyParser.json())

// Require the routes
require('./app/routes/note.routes.js')(app)

// defines a simple base root
app.get('/', (req, res) => {
  res.json({ 'message': 'Welcome to TakeNotes application. Take Notes quickly and easily' })
})

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
