//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
var lowerCase = require('lodash.lowercase');

//mongoose.connect("mongodb://localhost:27017/diaryDB",{ useNewUrlParser: true,useUnifiedTopology: true  });
mongoose.connect("mongodb+srv://admin-prudhvi:admin@cluster0.tlfgp.mongodb.net/diaryDB",{ useNewUrlParser: true,useUnifiedTopology: true  });

//var homedata=[];
const homeStartingContent = "Apple wants a weekend or expensive dui want to decorate. Which is always the creator nor the duration of her life. Carrots carrots just been running a lot. Product lived in this. Financing yeast rice vegetarian or clinical portal. That they are not members, nor members of the Donec ultrices tincidunt arcu. A lot of television targeted at the undergraduate nutrition. Of life, and the mountains shall be born, ultricies quis, congue in magnis dis parturient. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. The founder of basketball and football propaganda graduated drink at the arc. Performance skirt smile at any hate for hate vulputate. Running a lot of television targeted at the undergraduate nutrition.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const diaryschema=new mongoose.Schema({
titlename:String,
content:String
});
const diarycollection=mongoose.model("diary",diaryschema);


app.get("/",function(req,res){
  // console.log(homedata);
  diarycollection.find(function(err,outcome){
    if(err)
    {
      console.log(error);
    }
    else
    {
      console.log(outcome);
      res.render("home",{homeStartingContent:homeStartingContent,composedata:outcome});
    }
  });

  //,composedata:outcome
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
const newpost=new diarycollection({
  titlename:req.body.Addtask,
  content:req.body.content
});
newpost.save();
res.redirect("/");

});

app.get("/posts/:topic",function(req,res){
  //var id="ObjectId("+req.params.topic+")";
  //var id=(req.params.topic).slice(1, (req.params.topic).length);
var id=req.params.topic;
diarycollection.findOne({_id:id},function(err,outcome){
  if(err)
  {
    console.log(err);
  }
  else
  {
    res.render("post",{element:outcome});
  }
});

  // homedata.forEach(function(element){
  //   if(lowerCase(element.title)===lowerCase(req.params.topic))
  //   {
  //     res.render("post",{element:element});
  //   }
  // });

});





app.listen(process.env.PORT|| 3000, function() {
  console.log("Server started on port 3000");
});
