const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.json({
        service: "Pro manage server",
        status: "Active",
        time: new Date(),
    });
});

app.use('/user', authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log(`Server running on port ${PORT}`))
        .catch((error) => console.log(error.message));
})