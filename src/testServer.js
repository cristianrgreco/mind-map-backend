const express = require('express');

const app = express();
app.use(express.json());

const port = 8000;

const mindMaps = {
    uuid: {
        "nodeList": {
            "nodes": [{
                "id": "id-1587406210948",
                "value": "Artificial Intelligence",
                "isNew": false,
                "isRoot": true,
                "isSelected": false,
                "x": 5674,
                "y": 5375,
                "width": 167,
                "height": 42,
                "parent": null
            }, {
                "id": "id-1587406216040",
                "value": "Machine Learning",
                "isNew": false,
                "isRoot": false,
                "isSelected": false,
                "x": 5590,
                "y": 5523,
                "width": 138,
                "height": 38,
                "parent": "id-1587406210948"
            }, {
                "id": "id-1587406220924",
                "value": "Neural Networks",
                "isNew": false,
                "isRoot": false,
                "isSelected": true,
                "x": 5932,
                "y": 5580,
                "width": 130,
                "height": 38,
                "parent": "id-1587406210948"
            }],
            "selectedNodes": ["id-1587406210948", "id-1587406216040", "id-1587406210948", "id-1587406220924"],
            "lastAddedNode": "id-1587406220924"
        }, "pan": {"x": -5000, "y": -5000}
    }
};

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
    mindMaps[req.params.id] = req.body;
    return res.sendStatus(201);
});

app.listen(port, () => console.log(`Test server listening at http://localhost:${port}`));
