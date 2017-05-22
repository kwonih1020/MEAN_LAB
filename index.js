const express    = require("express");
const bodyParser = require("body-parser");
const hbs        = require("express-handlebars");
const mongoose   = require("./db/connection");

const app        = express();

const Question = mongoose.model("Question");

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

app.get("/", function(req, res) {
  res.render("questions");
});

app.get("/api/questions", function(req, res){
  Question.find({}).then (function(questions){
    res.json(questions);
  )};
});

app.get("/api/questions/:id", function(req, res){
  Question.findOne({id: req.params.id}).then(function(question){
    res.json(question)
  });
});

app.post("/api/questions", function(req, res){
  Question.create(req.body).then(function(question){
    res.json(question)
  });
});

app.delete("/api/questions/:id", function(req, res){
  Question.findOneAndRemove({id: req.params.id}).then(function(){
    res.json({ msg: "success" })
  });
});

app.put("/api/questions/:id", function(req, res){
  Question.findOneAndUpdate({id: req.params.id}, req.body, {new: true}).then(function(question){
    res.json(question)
  });
});


app.listen(app.get("port"), function(){
  console.log("Port 8790 is alivvvvvvvvve");
});
