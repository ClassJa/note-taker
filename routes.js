const express = require('express')

const PORT = 3001

const app = express()

const db = require('./db/db.json')

const path = require('path')
const { title } = require('process')

const fs = require('fs')

const uuid = require('generate-unique-id');

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static("public"))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    // return res.json(db)
    fs.readFile('./db/db.json', (err, data) => {
       res.send(JSON.parse(data))
    })
})

// get contents of db.json, by reading it, store that in an array variable, get the new post, then push that to the array of objects in db.json 
app.post('/api/notes', (req, res) => {
    const uuidGenerator = uuid()
    
    // The constructor/structure for the newNotes object
    const newNote = {
        // creates a unique id 
        id: uuidGenerator,
        title: req.body.title,
        text: req.body.text
    };

    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if (err) {
            throw Error(`Error: ${err}`)
        }
        const arrNotes = JSON.parse(data)

        arrNotes.push(newNote)
        console.log(arrNotes)
        
        fs.writeFile('./db/db.json', JSON.stringify(arrNotes), () => {
            console.log("Note added to db.json")
        })
        res.json("New note added")
    })
})

// any route that isn't explicitly defined will default to this api call usually shows the 404 page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// creating the bonus delete route
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    console.log(req.url)
    fs.readFile('./db/db.json', "utf-8", (err, data) => {
        if (err) {
            throw Error(`Error: ${err}`)
        }
        if(req.url === '/api/notes/'+id) {
            const parsedData = JSON.parse(data)
            const filteredNotes = parsedData.filter(note => note.id !== id)
            fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), () => {
                console.log("Note deleted")
            })
            console.log(filteredNotes)
            // data.pop(id)
            // delete data.id
            // console.log(data)
            // console.log(typeof(data))
        }
    })
    res.json(`Note with id:${id} was deleted.`)
} )

// starts the server to listen to requests from the frontend
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

