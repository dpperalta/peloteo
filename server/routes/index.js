const express = require('express');

const app = express();

app.use(require('./usuario'));
app.use(require('./rol'));
app.use(require('./persona'));
app.use(require('./login'));
app.use(require('./cancha'));
app.use(require('./reserva'));

module.exports = app;