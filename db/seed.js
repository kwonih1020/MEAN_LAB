let mongoose = require("./connection.js");
let seedData = require("./seeds");
let Question = mongoose.Question;
let Answer = mongoose.Answer;



let answer1 = new Answer ({
    "content": "Out too the been like hard off. "
})


Answer.remove({}).then(function(){
  Answer.collection.insert(newAnswers).then(function(){
  });
});


Question.remove({}).then(function(){

  const questions = seedData.map(question => {
    return new Question(question);
  })


  for(let i = 0; i < questions.length; i++){
    questions[i].answers.push(answer1)
    questions[i].save((err, answer) =>{
      if (err){
        console.log(err)
      } else {
        console.log(answer);
      }
    })
  }


});
