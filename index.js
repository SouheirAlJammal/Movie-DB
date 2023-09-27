const express = require('express');
app = express();

app.get('/', (req, res) => {
    res.send('Ok!')
})

app.listen(3000, () => console.log('this server is listening to 3000 port'));