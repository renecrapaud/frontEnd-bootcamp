const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(cors());

morgan.token("namereq", function (req, res) {
  return req.body && req.body.name ? req.body.name : "-";
});
morgan.token("number", function (req, res) {
  return req.body && req.body.number ? req.body.number : "-";
});
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms {"name":":namereq","number":":number"}',
  ),
);

let entries = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(entries);
});

app.get("/info", (request, response) => {
  const bookEntries = entries.length;
  const dateNow = new Date();
  const infoTxt = `<p>Phone book has info for ${bookEntries} people <br/> ${dateNow.toString()}</p>`;
  response.send(infoTxt);
});

app.get("/api/persons/:id", (request, response) => {
  const idtoGet = Number(request.params.id);
  const personReg = entries.find((reg) => reg.id === idtoGet);
  if (personReg) {
    response.json(personReg);
  } else {
    response.status(400).json({
      error: "content missing",
    });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const idtoGet = Number(request.params.id);
  entries = entries.filter((reg) => reg.id !== idtoGet);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body?.name || !body?.number) {
    return response.status(400).json({
      error: "Missing data in request",
    });
  }

  if (entries.find((reg) => reg.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }
  const newId = Math.floor(Math.random() * 50000);

  const newEntry = {
    id: newId,
    name: body.name,
    number: body.number,
  };
  entries = entries.concat(newEntry);
  response.json(newEntry);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
