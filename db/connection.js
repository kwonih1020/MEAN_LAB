let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/questions');

let Schema = mongoose.Schema;

let QuestionSchema = new Schema({
  title: String,
  content: String,
  author: String
  // answers: [AnswerSchema]
})

// let AnswerSchema = new Answer({
//   content: String,
//   author: String
// })

let Question = mongoose.model("Question", QuestionSchema);
// let Answer = mongoose.model("Answer", QuestionSchema);

module.exports = {
  Question
}
