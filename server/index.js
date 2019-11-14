const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.connect(process.env.MongoDB); // 2
const db = mongoose.connection; // 3
// 4
db.once("open", function(){
  console.log("DB connected");
});
// 5
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});
// Other settings
app.set("view engine", "ejs");

app.use('/', express.static(__dirname + '/../src'));

  
app.get('*', function (request, response){
  response.send(path.resolve(__dirname, '../src', 'app.js'))
})

// Port setting
const port = 7376;
app.listen(7376, function(){
  console.log("server on! http://localhost:"+port);
});