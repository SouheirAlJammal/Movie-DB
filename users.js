
const express = require('express');
app = express();


const users = [ { username: 'John', password: '1234' }, { username: 'Jane', password: '5678' } ];

app.get('/users',(req,res)=>{
    res.status(200).json({ status: 200, data: users });
})


//route to create ]user
app.post('/users', (req, res) => {

    if (req.query.username && req.query.password) {
        let newUser = { username: req.query.username, password: req.query.password};
        movies.push(newUser);
        res.status(200).json({ status: 200, data: users });
    }

    else res.status(403).json({
        status: 403,
        error: true,
        message: 'you cannot add user'
    })

})


//update user
app.put('/users/:id', (req, res) => {
    let selectedUser = req.params.id
    users[selectedUser-1] = {
        username: req.query.username || users[selectedUser-1].username,
        password: req.query.password || users[selectedUser-1].password,
    }
    res.status(200).json({ status: 200, data:users })
})


//route to delete user by id
app.delete('/users/:id', (req, res) => {
    if (req.params.id < 1 || req.params.id > users.length) { res.status(404).json({ status: 404, error: true, data: `the user ${req.params.id} does not exist` }) }
    else {
        users.splice(req.params.id - 1, 1);
        res.status(200).json({ status: 200, data: users })
    }
})


    app.listen(5000, () => console.log('this server is listening to 5000 port'));