const mongoose = require("mongoose");
var Person = null;

if (process.argv.length == 5) {
  prepareDBConnection();
  saveRecord();
} else if (process.argv.length == 3) {
  prepareDBConnection();
  getAllRecs();
} else {
  console.log("Provide expected arguments");
  process.exit(1);
}

function prepareDBConnection() {
  const password = process.argv[2];

  const url = `mongodb+srv://renecrapaud:${password}@testcluster.qltydco.mongodb.net/?appName=TestCluster`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  Person = mongoose.model("Person", personSchema);
}

function saveRecord() {
  const nameArg = process.argv[3];
  const numberArg = process.argv[4];

  const person = new Person({
    name: nameArg,
    number: numberArg,
  });

  person.save().then((result) => {
    console.log(`added ${nameArg} number ${numberArg} to phonebook`);
    mongoose.connection.close();
  });
}

function getAllRecs() {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
