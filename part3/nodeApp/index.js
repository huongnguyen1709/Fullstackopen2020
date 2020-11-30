const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'));

let people = []

// let persons = [
//     {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//     },
//     {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//     },
//     {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//     },
//     {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//     }
// ]

//generates random id;
let guid = () => {
    return Math.floor(Math.random() * Date.now())
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        people = persons.map(person => person)
        console.log(typeof persons)
        console.log(persons)
        console.log('people are', people)
        console.log(typeof people)
        response.json(persons)
    })
})

// app.get('/info', (request, response) => {
//     response.send(`
//         <h4>Phonebook has info for ${persons.length} people</h4>
//         <h4>${new Date()}</h4>
//     `)
// })

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons && persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const isCheck = persons.every(person => person.name.toLowerCase() !== body.name.toLowerCase())
    console.log(isCheck)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (!isCheck) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }
    console.log(typeof body.number)

    const person = new Person({
        name: body.name,
        number: body.number,
        id: guid()
    })

    person.save().then(savedInfo => {
        console.log(savedInfo)
        console.log('info saved!')
        response.json(savedInfo)
    }).catch(err => {
        res.status(500).json({
            err: err
        })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})