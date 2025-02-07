const { query } = require('express');

const app = require('express')();
const port = process.argv[2] !== undefined? parseFloat(process.argv[2]) : "3000" ;
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
        message: 'Hello'
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
app.post('/movies/add?', (req, res) => {
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;
    let output;

    if (title !== undefined && year !== undefined && (/^\d{4}$/).test(year)) {
        
        if (rating !== undefined) {
        movies.push({ title: title, year: year, rating: rating });
        output = { status: 200, data: movies };
        }
        else {
        movies.push({ title: title, year: year, rating: 4 });
        output = { status: 200, data: movies };
        }
    }
    else {
        output = {
        status: 403,
        error: true,
        message: "you cannot create a movie without providing a title and a year",
        };
    }
    res.send(output);
});

/**
 * Read a mvoie
 */

app.get('/movies/read/:text?', (req, res) => {
    let text = req.params.text;
    let output;

    if(text === 'by-date') {
        output = {status:200, data: movies.slice().sort((a, b) => a.year - b.year)}
    }
    else if(text === 'by-rating'){
        output = {status:200, data: movies.slice().sort((a, b) => b.rating - a.rating)}
    }
    else if(text === 'by-title'){
        output = {status:200, data: movies.slice().sort((a, b) => b.title - a.title)}
    }
    else if(text.match(/[id/\d+$]/g)){
        let number = text.match(/\d+/);
        if(number <= movies.length){
            output = movies[number];
        }
        else{
            output = {status:404, error:true, message:`the movie ${number} does not exist`}
        }
    }
    res.status(output.status).send(output);
})

/**
 * Update a movie
 */

app.put('/movies/update/:id(\\d+)', (req, res) => {
    let id = req.params.id - 1;
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;
    let output;
  
    if (movies.length >= id) {
      if (title === undefined || title === "") {
        title = movies[id].title;
      }
  
      if (year === undefined || year === "" || !(/^\d{4}$/).test(year)) {
        year = movies[id].year;
      }
  
      if (rating === undefined || rating === "") {
        rating = movies[id].rating;
      }
      movies[id] = {title, year,rating};
      output = {data: movies };
      res.status(200).send(output)
    } 
    else {
      output = {
        error: true,
        message: `the movie ${id+1} does not exist`,
      };
      res.status(404).send(output)
    }    
})

/**
 * Delete a movie
 */

app.delete('/movies/delete/:id', (req, res) => {
    let id = req.params.id;
    let output;
    // let test = movies.length;
    if(id <= movies.length){
        movies.splice(id-1, 1);
        output = movies;
    }else{
        output = {status:404, error:true, message:`the movie ${id} does not exist`}
    }
    res.send(output);
})