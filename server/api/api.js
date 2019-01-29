const express = require('express')
const app = express()
const port = 8888
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://db:27017/test");

var nameSchema = new mongoose.Schema({
 Name: {
   type: String,
   required: [true, "Username cannot be blank"],
   unique: true,
 }
});
var User = mongoose.model("User", nameSchema);


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', (req, res) => {
  User.find({}, function(err, users) {
    res.send(JSON.stringify(users.map(_ => _.Name)))
  });
});

app.post('/test', (req, res) => { 
  var myUser = new User(req.body);
    myUser.save()
    .then(item => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({success:true}))
      console.log("Created User!" + myUser.Name);
    })
    .catch(err => {
      if (err.name == 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(400).json(err);
      }
    });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
