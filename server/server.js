require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(require('./routes/usuario'));
app.use(require('./routes/rol'));
app.use(require('./routes/persona'));

mongoose.connect('mongodb://localhost:27017/peloteo', (err, res) => {
    if (err) throw err;
    console.log('Base de Datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando peticiones en el puerto', process.env.PORT);
});