const express = require('express');
const cors = require('cors');
const { getStationsInfo, getStationStatus } = require('./feedData.js');

const app = express();
const port = 4020;

app.use(cors());

app.get('/stations', (req, res) => {
    res.json(getStationsInfo());
});

app.get('/stations/:id', (req, res) => {
    res.json(getStationStatus(req.params.id));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
