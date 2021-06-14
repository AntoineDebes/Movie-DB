const express = require('express')
const app = express()
const port = parseFloat(process.argv[2]);


app.get('/', (req, res) => {
  res.send('Ok')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/test', (req, res) => {
    let data = {
        status: 200,
        message: 'Ok'
    };

    res.send(data);
})


app.get('/time', (req, res) => {
    let date =  new Date;
    let dateHour = date.getHours();
    let dateMinut = date.getMinutes();
   let newDate =  dateHour +':'+ dateMinut;
    let data = {
        status: 200,
        message: newDate,
    };
    res.send(data);
})

app.get('/hello/:id?', (req, res,) => {
    let id = req.params.id;
    let response = {
        status:200,
        message:`Hello, ${id !== undefined? id : "User"}`}
   res.send(response);
})

app.get('/search/:search?', (req, res) => {
    let searchText = req.params.search;
    let response = () => {
        if(searchText !== undefined) return {status:200, message:"ok", data: searchText}
        if(searchText === undefined) return {status:500, error:true, message:"you have to provide a search"}
    }
    res.send(response())
})

// /**
//  * Startup function
//  */
// function startApp () {
//     process.stdin.on('data', onDataReceived);
// }

/**
 * Tests the data that we received from the terminal
 */

// function onDataReceived () {
//     console.log('yes');
// }

/**
 * This is a call-back function that starts our app
 */
// startApp();