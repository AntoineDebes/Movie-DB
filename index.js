const express = require('express')
const app = express()
const port = Number(process.argv[2]);


app.get('/', (req, res) => {
  res.send('Hello World!')

})

app.listen(port, () => {
    if(port !== undefined) return console.log('Yes');
})