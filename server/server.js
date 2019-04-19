require('./config/config');

const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    res.json({
        body
    });
    console.log('post Usuario');
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id,
    });
    console.log('put Usuario');
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando peticiones en el puerto', process.env.PORT);
});