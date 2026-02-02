const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passWdHash: String,
  name: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passWdHash
  }
})

module.exports = mongoose.model('User', userSchema)
