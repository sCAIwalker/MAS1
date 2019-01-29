const express = require('express')
const app = express()
const port = 8888
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://db:27017/test");
var nameSchema = new mongoose.Schema({
 Name: String,
});
var User = mongoose.model("User", nameSchema);


app.get('/', (req, res) => res.send('Hello World!'))
app.post('/test', (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({success:true}))
      console.log("Created User!");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
