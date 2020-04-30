const express = require('express');
const {validate, fromPayload} = require('./mapDto');

const app = express();
app.use(express.json());

const port = 8000;

const mindMaps = {};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    next();
});

app.get('/maps/:id', (req, res) => {
    if (mindMaps[req.params.id]) {
        return res.json(mindMaps[req.params.id]);
    } else {
        return res.sendStatus(404);
    }
});

app.put('/maps/:id', (req, res) => {
    const validationErrors = validate(req.body)
    if (validationErrors) {
        return res.status(400).json(validationErrors);
    }
    mindMaps[req.params.id] = fromPayload(req.body);
    return res.sendStatus(201);
});

app.listen(port, () => console.log(`Test server listening at http://localhost:${port}`));
