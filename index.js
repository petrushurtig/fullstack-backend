import express from "express"
const app = express()

app.use(express.json())

let persons = [
          { 
            "name": "Arto Hellas", 
            "number": "040-123456",
            "id": 1
          },
          { 
            "name": "Ada Lovelace", 
            "number": "39-44-5323523",
            "id": 2
          },
          { 
            "name": "Dan Abramov", 
            "number": "12-43-234345",
            "id": 3
          },
          { 
            "name": "Mary Poppendieck", 
            "number": "39-23-6423122",
            "id": 4
          }
]
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})
const generateId= () => {
    const id = Math.floor(Math.random() * 300);
    return id;
}
app.post('/api/persons', (req, res) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
      }
      persons = persons.concat(person)
    res.json(person);
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})