const express = require('express');
app = express();


const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

app.get('/', (req, res) => {
    res.send('Ok!')
})


//routes step3
app.get('/test', (req, res) => {
    res.status(200).json({ status: 200, message: "ok" })
})

app.get('/time', (req, res) => {
    let currentTime = new Date();
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    res.status(200).json({ status: 200, message: `${hours}:${minutes}` })
})


//route to hello page
app.get('/hello/:id?', (req, res) => {
    res.status(200).json({ status: 200, message: (req.params.id) ? `Hello,${req.params.id}` : `Hello!` })
})


//route for search
app.get('/search', (req, res) => {
    (req.query.s != undefined)
        ? res.status(200).json({ status: 200, message: "ok", data: req.query.s })
        : res.status(500).json({ status: 500, error: true, message: "you have to provide a search" })
})



//route to add movie
//route to create movie
app.post('/movies', (req, res) => {
    let yearDigit = /^\d\d\d\d$/;
    //title exist and year of 4 digit exist
    if (req.query.title && (yearDigit).test(req.query.year)) {
        let newMovie = { title: req.query.title, year: req.query.year, rating: (req.query.rating || 4) };
        movies.push(newMovie);
        res.status(200).json({ status: 200, data: movies });
    }
    //title or year missed or not of 4 digit
    else res.status(403).json({
        status: 403,
        error: true,
        message: 'you cannot create a movie without providing a title and a year'
    })

})


//route to get movie
//get movie by default or by order of date , rate , title

app.get('/movies/:order?', (req, res) => {
    switch (req.params.order) {
        case 'by-date': res.status(200).json({ status: 200, data: movies.sort((a, b) => (a.year) - (b.year)) }); break;
        case 'by-rating': res.status(200).json({ status: 200, data: movies.sort((a, b) => (a.rating) - (b.rating)) }); break;
        case 'by-title': res.status(200).json({ status: 200, data: movies.sort((a, b) => (a.title).localeCompare(b.title)) }); break;
        case undefined: res.status(200).json({ status: 200, data: movies}); break;
    }
})


//get movie by id
app.get('/movies/id/:id', (req, res) => {
    if (req.params.id < 1 || req.params.id > movies.length) { res.status(404).json({ status: 404, error: true, data: `the movie ${req.params.id} does not exist` }) }
    else { res.status(200).json({ status: 200, data: movies.filter(movie => movie == movies[req.params.id - 1]) }) }
})


//route to update movie
app.put('/movies/:id', (req, res) => {
    let selectedMovie = req.params.id
    movies[selectedMovie-1] = {
        title: req.query.title || movies[selectedMovie-1].title,
        year: req.query.year || movies[selectedMovie-1].year,
        rating: (req.query.rating || movies[selectedMovie-1].rating)
    }
    res.status(200).json({ status: 200, data: movies })
})


//route to delete movie
//route to delete movie by id
app.delete('/movies/:id', (req, res) => {
    if (req.params.id < 1 || req.params.id > movies.length) { res.status(404).json({ status: 404, error: true, data: `the movie ${req.params.id} does not exist` }) }
    else {
        movies.splice(req.params.id - 1, 1);
        res.status(200).json({ status: 200, data: movies })
    }
})


app.listen(3000, () => console.log('this server is listening to 3000 port'));