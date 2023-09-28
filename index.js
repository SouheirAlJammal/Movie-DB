const express = require('express');
app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const mongoDB = process.env.MD_URI;


//schema of data in mongoDB
movieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true,
        validate: {
            validator: value => /^\d{4}$/.test(value),
            message: 'year should be of 4 digit number'
        }
    },
    rating: {
        type: Number,
        require: true,
        default: 4,
        min: 0,
        max: 10
    },

})

//model of schema
const Movie = mongoose.model('Movie', movieSchema)

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ok!')
})


//route to add movie
//route to create movie
app.post('/movies',permession, (req, res) => {
    let newMovie = new Movie(
        {
            title: req.body.title,
            year: req.body.year,
            rating: req.body.rating
        });
    //save newMovie in data
    newMovie.save()
        .then(() => {
            res.status(200).json({ status: 200, data: newMovie });
        })
        .catch(error => res.status(403).json({
            status: 403,
            message: 'failed to create a movie',
            error

        }));

})


//get movie by default or by order of date , rate , title

//get all movies
app.get('/movies', (req, res) => {

    Movie.find({})
        .then(movies => res.status(200).json({ status: 200, data: movies }))
        .catch(error => {
            res.status(404).json({ message: 'data not found', error })
        })
})


//get movie by title
app.get('/movies/by-title', (req, res) => {

    Movie.find({}).sort({ title: 1 })
        .then(movies => res.status(200).json({ status: 200, data: movies }))
        .catch(error => {
            res.status(404).json({ message: 'data not found', error })
        })
})

//get movie by date
app.get('/movies/by-date', (req, res) => {

    Movie.find({}).sort({ year: 1 })
        .then(movies => res.status(200).json({ status: 200, data: movies }))
        .catch(error => {
            res.status(404).json({ message: 'data not found', error })
        })
})

//get movie by rating
app.get('/movies/by-rating', (req, res) => {

    Movie.find({}).sort({ rating: 1 })
        .then(movies => res.status(200).json({ status: 200, data: movies }))
        .catch(error => {
            res.status(404).json({ message: 'data not found', error })
        })
})

//get movie by id
app.get('/movies/id/:id', (req, res) => {
    const movieId = req.params.id;
    Movie.findById(movieId)
        .then(movie => res.status(200).json({ status: 200, data: movie }))
        .catch(error => res.status(404).json({ status: 404, error }))

})


//route to update movie
app.put('/movies/:id',permession, (req, res) => {
    let idMovie = req.params.id
    Movie.findByIdAndUpdate(idMovie, req.body, { new: true })
        .then(movie => res.status(200).json({ status: 200, data: movie }))
        .catch(error => res.status(500).json({ status: 500, error }))
})


//route to delete movie
//route to delete movie by id
app.delete('/movies/:id',permession, (req, res) => {
    const movieId = req.params.id
    Movie.findByIdAndDelete(movieId)
        .then(() => res.status(200).json({ status: 200, message: 'movie deleted successfully' }))
        .catch(error => res.status(500).json({ status: 404, error }))
})



//authentication function 
const users = [{ username: 'John', password: '1234' }, { username: 'Jane', password: '5678' }];
function permession(req, res, next) {
    const { username, password } = req.headers;
    const testUser = users.find(user => user.username === username && user.password === password)
        (testUser) ? next() : res.status(401).json({ message: 'not authenticated' })
}


mongoose.connect(mongoDB)
    .then(() => {
        app.listen(3000, () => console.log('this server is listening to 3000 port'));
    })
    .catch((error) => {
        console.log(error);
    })