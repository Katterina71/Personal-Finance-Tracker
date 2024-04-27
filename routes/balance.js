const express = require('express');
const router = express.Router();


// Read and add update date to files
const path = require('path');
const updateData = require('../utilities/update-data-files');
const dataFilePath = path.join(__dirname, '../data/balance.js');

router.route('/api').get((req, res) => {
        let balance = updateData.loadData(dataFilePath);
        res.json({ balance });
    });

router.route('/:id').get((req,res)=> {
         const userId = req.params.id; 
        res.render('balance', {title: 'Create balance:', userId});
 })


router.post('/:id/create',(req, res, next) => {
 
    if (req.body.month && req.body.amount) {
        let allBalance = updateData.loadData(dataFilePath);
        if (allBalance.find((b) => b.month == req.body.month) && allBalance.find((b) => b.userId == req.params.id)) {
            next(res.render('register', {title: 'Register Form', userExist:`This month's budget has been set`}));
          }
        else {

        const balance = {
          id: allBalance[allBalance.length - 1].id + 1,
          userId: req.params.id,
          amount: req.body.amount,
          month: req.body.month,
        };
        
        allBalance.push(balance);
        updateData.saveData(allBalance, dataFilePath);
        res.redirect(`/dashboard/${req.params.id}`)

        }
      } else next(res.send('Insufficient Data').status(404));
});

let balanceData = updateData.loadData(dataFilePath);

exports.Router = router,
exports.BalanceData = balanceData;
