const express = require("express");
const app = express()
const morgan = require("morgan");
const cors = require('cors');
require('dotenv').config();

const Person = require('./models/person');

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

// const generateId= () => {
//     const id = Math.floor(Math.random() * 300);
//     return id;
// }
app.post('/api/persons', (req, res) => {
    const body = req.body;
    if(body.name === undefined){
        return res.status(400).json({error: 'name missing'})
    }
    if(body.number === undefined){
        return res.status(400).json({error:'number missing'})
    }
    // if(persons.find(person => person.name === body.name)){
    //     return res.status(400).json({
    //         error: 'name already in use'
    //     })
    // }
    const person = new Person({
        name: body.name,
        number: body.number
      })
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})
app.get('/info', (req, res) => {
    const amount = persons.length;
    const time = new Date();
    res.send(`<p>Phonebook has info for ${amount} people</p><p>${time}</p>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
