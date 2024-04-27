const express = require('express');
const router = express.Router();

const subcategories = require('../data/subcategories');
const categories = require('../data/categories');

router
    .route('/api')
    .get((req, res) => {
        res.json({ subcategories });
    });

// module.exports = router;

exports.Router = router;
exports.Data =  subcategories;
exports.CategoriesData =  categories;
