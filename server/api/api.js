const express = require('express')
const app = express()
const port = 8888

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({success:true}))
  }
)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
