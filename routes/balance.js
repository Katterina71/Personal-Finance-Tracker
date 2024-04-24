const express = require('express');
const router = express.Router();

const balance = require('../data/balance');

router
    .route('/')
    .get((req, res) => {
        res.json({ balance });
    });


module.exports = router;