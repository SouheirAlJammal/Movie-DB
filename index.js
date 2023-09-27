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

app.listen(3000, () => console.log('this server is listening to 3000 port'));