const express = require('express')
const app = express()
const port = parseFloat(process.argv[2]);
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]


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
        message:`Hello, ${id !== undefined? id : "User"}`
    }
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

// Step 5

/**
 * Creates a movie
 */

app.get('/movies/create', (req, res) => {
    
})

/**
 * Read a mvoie
 */

app.get('/movies/read/:text?', (req, res) => {
    let text = req.params.text;
    let output;
    if(text === 'by-date') {
        output = {status:200, data: movies.sort((a, b) => a.year - b.year)}
    }else if(text === 'by-rating'){
        output = {status:200, data: movies.sort((a, b) => b.rating - a.rating)}
    }else if(text === 'by-title'){
        output = {status:200, data: movies.sort((a, b) => b.title - a.title)}
    }else if(text.match(/[id/\d+$]/g)){
        let number = text.match(/\d+/);
        if(number <= movies.length){
            output = movies[number];
        }else{
            output = {status:404, error:true, message:`the movie ${number} does not exist`}
        }
    }
    res.status(output.status).send(output);
})

/**
 * Update a movie
 */

app.get('/movies/update', (req, res) => {
    
})

/**
 * Delete a movie
 */

app.get('/movies/delete', (req, res) => {
    
})