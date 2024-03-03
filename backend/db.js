/**
 * title : string
 * description : string
 * completed : boolean
 */
const mongoose = require('mongoose');
const userName = "susmita8336biswas"
const password = "VRiuygI2AbcLg3b4"

mongoose.connect(`mongodb+srv://${userName}:${password}@todo.ay7ypfk.mongodb.net/`);

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
});

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}