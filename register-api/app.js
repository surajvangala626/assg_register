const express = require('express');
var bodyParser = require(`body-parser`);
const app = express();
app.use(bodyParser.json());
var query = require('./database/operations');

const port = 3000

const API_BASE_URL = '/api/v1'
app.post(`${API_BASE_URL}/register-user`, (req, res) => {
    const credentials = {
        username: req.body.username,
        password: req.body.password
    };
    query.saveUserCredentials(credentials).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send(err);
    })
});

app.post(`${API_BASE_URL}/add-user-details`, (req, res) => {
    const details = {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    };
    query.saveUserDetails(details).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send(err);
    })
});

app.post(`${API_BASE_URL}/upload-file`, (req, res) => {
    // const details = {
    //     id: req.body.id
    // };
    console.log('Hi');
    res.send('Hi');
    // query.saveUserDetails(details).then((result) => {
    //     res.send(result);
    // }).catch((err) => {
    //     res.status(500).send(err);
    // })
});

app.listen(port, () => {
    console.log(`Application running on port ${port}!`)
    query.setDatabase();
})