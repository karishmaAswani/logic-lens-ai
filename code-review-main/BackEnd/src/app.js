const express = require('express');
const reviewRoutes = require('./routes/review.routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/review', reviewRoutes);

module.exports = app