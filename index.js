const express = require('express');
app = express();

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
app.listen(3000, () => console.log('this server is listening to 3000 port'));