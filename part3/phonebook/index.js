const express = require('express')
const app = express()

let entries = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(entries)
})

app.get('/info', (request, response) => {
    const bookEntries = entries.length
    const dateNow = new Date()
    const infoTxt = `<p>Phone book has info for ${bookEntries} people <br/> ${dateNow.toString()}</p>`
    response.send(infoTxt)
})

app.get('/api/persons/:id', (request,response) => {
    const idtoGet = Number(request.params.id)
    const personReg = entries.find(reg => reg.id === idtoGet)
    if(personReg){
        response.json(personReg)
    } else {
        response.status(400).json({ 
          error: 'content missing' 
        })
    }

})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})