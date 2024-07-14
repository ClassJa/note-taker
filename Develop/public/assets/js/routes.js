const express = require('express')

const PORT = 3001

const app = express()

const db = require('../../../db/db.json')

// const notes = require('../../../../Develop/')

app.get('/', (res, req) => {
    res.send(db)

})

app.get('/db', () => {
    res.json(db)
})

app.get('/', (res, req) => {
    res.send()
})