const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

app.use(express.static("dist"));

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

let entries = [];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    entries = persons;
    response.json(persons);
  });
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

app.delete("/api/persons/:id", (request, response, next) => {
  const idtoGet = request.params.id;
  Person.findByIdAndDelete(idtoGet)
    .then((result) => {
      entries = entries.filter((reg) => reg._id.toString() !== idtoGet);
      response.status(204).end();
    })
    .catch((error) => next(error));
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

  const newEntry = new Person({
    //id: newId,
    name: body.name,
    number: body.number,
  });
  newEntry.save().then((result) => {
    entries = entries.concat(newEntry);
    console.log(
      `added ${newEntry.name} number ${newEntry.number} to phonebook`,
    );
    response.json(newEntry);
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id",
    });
  }
  next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
