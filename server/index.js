const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
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
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.get('*', (req, res, next) => {
    if(req.path.split('/')[1] === 'static') return next();
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(7376, function () {
  console.log('Example app listening on port 7376!');
});