let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/meanlab');

let Schema = mongoose.Schema;

let AnswerSchema = new Schema({
  content: String,
})

let QuestionSchema = new Schema({
  title: String,
  content: String,
  author: String,
  answers: [AnswerSchema]
})

let Question = mongoose.model("Question", QuestionSchema);
let Answer = mongoose.model("Answer", AnswerSchema);

module.exports = {
  Question, Answer
}
