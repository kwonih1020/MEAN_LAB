let mongoose = require("./connection.js");
let seedData = require("./seeds");
let Question = mongoose.Question;


// let Question = mongoose.model("Question");
// let Answer = mongoose.model("Answer");

Question.remove({}).then(function(){
  Question.collection.insert(seedData).then(function(){
    process.exit();
  });
});
