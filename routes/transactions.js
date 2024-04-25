const express = require('express');
const router = express.Router();

const transactions = require('../data/transactions');

router
    .route('/')
    .get((req, res) => {
        res.json({ transactions });
    });

module.exports = router;