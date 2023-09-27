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
app.get('/movies/create',(req,res)=>{
    res.status(200).send('Done')
})


//route to get movie
app.get('/movies/read',(req,res)=>{
    res.status(200).json({status:200, data: movies})
})


//route to update movie
app.get('/movies/update',(req,res)=>{
    res.status(200).send('Done')
})


//route to delete movie
app.get('/movies/delete',(req,res)=>{
    res.status(200).send('Done')
})

app.listen(3000, () => console.log('this server is listening to 3000 port'));