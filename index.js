const express    = require("express");
const parser = require("body-parser");
const hbs        = require("express-handlebars");
const mongoose   = require("./db/connection");

const app        = express();


const Question = mongoose.Question;
const Answer = mongoose.Answer;

app.set("port", process.env.PORT || 8790);

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.json());

app.get("/api/questions", function(req, res){
  Question.find({}).then (function(questions){
    res.json(questions);
  });
});

app.get("/api/questions/:id", function(req, res){
  Question.findOne({_id: req.params.id}).then(function(question){
    res.json(question)
  });
});

app.post("/api/questions", function(req, res){
  Question.create(req.body).then(function(question){
    console.log(req.body)
    res.json(question)
  });
});


app.post("/api/questions/:id/answers", function(req, res){
  let question = Question.findOne({_id: req.params.id}).then(function(question){
    let newAnswer = new Answer(req.body)
      console.log(newAnswer)
    question.answers.push(newAnswer)
    question.save((err, answer) =>{
      if (err){
        console.log(err)
      } else {
        res.json(question)
      }
    })
  })
});

app.delete("/api/questions/:id", function(req, res){
  Question.findOneAndRemove({_id: req.params.id}).then(function(){
    res.json({ msg: "success" })
  });
});

app.delete("/api/questions/:id/answers/:answer_id", function(req, res){
  Question.findOne({_id: req.params.id}).then(function(question){
    for (let i = 0; i < question.answers.length; i++){
      if (question.answers[i]._id == req.params.answer_id) {
        question.answers.splice(i, 1)
      }
    }
    question.save((err, question) =>{
      if (err){
        console.log(err)
      } else {
        res.json(question)
      }
    })
  })
});

app.put("/api/questions/:id", function(req, res){
  Question.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(question){
    res.json(question)
  });
});


app.get("/api/questions/:id/answers/:answer_id", function(req, res){

  Question.findOne({_id: req.params.id}).then(function(question){
  let answer = question.answers.find(function(answer){
    return answer._id == req.params.answer_id;
  })
  res.json(answer)
  })
});

app.put("/api/questions/:id/answers/:answer_id", function(req, res){

  Question.findOne({_id: req.params.id}).then(function(question){
  let answer = question.answers.find(function(answer){
    return answer._id == req.params.answer_id;
  })
    answer.content = req.body.content
    question.save((err, answer) =>{
      if (err){
        console.log(err)
      } else {
        console.log("answer", answer)
        res.json(answer)
      }
    })
  })
});



app.get("/*", function(req, res) {
  res.render("questions");
});


app.listen(app.get("port"), function(){
  console.log("Port 8790 is alivvvvvvvvve");
});
