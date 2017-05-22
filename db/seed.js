let mongoose = require("./connection.js");
let seedData = require("./seeds");
let Question = mongoose.Question;
let Answer = mongoose.Answer;




Question.remove({}).then(function(){
  Question.collection.insert(seedData).then(function(){
    process.exit();
  });
});
