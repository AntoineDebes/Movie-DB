const express = require('express')
const app = express()
const port = parseFloat(process.argv[2]);


app.get('/', (req, res) => {
  res.send('Ok')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})