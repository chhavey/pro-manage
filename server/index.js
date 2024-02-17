const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.send('Server is up and running successfully.');
});

app.listen(process.env.PORT, () => {
    console.log('Server running on port', process.env.PORT);
})