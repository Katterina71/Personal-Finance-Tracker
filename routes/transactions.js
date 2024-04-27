const express = require('express');
const router = express.Router();

const transactions = require('../data/transactions');

const app = express();
let ejs = require('ejs');
app.set('view engine', 'ejs');


//connect CSS file
const path = require('path');
app.use(express.static(path.join(__dirname, '..style')));
app.use(express.static(path.join(__dirname, 'public')));

router
    .route('/api')
    .get((req, res) => {
        res.json({ transactions });
    })

router
    .route('/add')
    .get((req,res)=> {
        res.render('transaction', {title: 'Create a transaction'});
      })
      

module.exports = router;