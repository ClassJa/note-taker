const express = require('express')

const PORT = 3001

const app = express()

const db = require('../../../db/db.json')

// const notes = require('../../../../Develop/')


app.get('*', (res, req) => {
    res.sendFile('index.html')
})


app.get('/notes', (res, req) => {
    res.sendFile('notes.html')
})


app.get('/api/notes', (res, req) => {
    res.json(db)
})

app.post('/api/notes', (res, req) => {
    res.json()

    // look into npm packages that can give the notes unique ids uuid
    // https://www.npmjs.com/package/generate-unique-id
})


// this 
app.get('/', (res, req) => {
    res.send('Navigate to a /notes or / route')
})
// or this

app.get('/api/notes', (res, req) => {
    res.sendFile('index.html')
})

app.get('/db', () => {
    res.json(db)
})

