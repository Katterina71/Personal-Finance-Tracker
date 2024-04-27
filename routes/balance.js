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


// router.route('/login').get((req,res)=> {
//     res.render('login', {title: 'Login', userCheck: ''});
//   });

  
// router.get('/login/check',(req, res, next) => {

//     if (req.query.login && req.query.password) {
//         let users = updateData.loadData(dataFilePath);
//         let user = users.find((u) => u.login == req.query.login)

//         if (user.login == req.query.login) {
//             if (user.password == req.query.password){
//              res.redirect(`/dashboard/${user.id}`)}
//             else { next(res.redirect('/users/login'));
//             }
//           }
          
//         else {
//             next(res.render('/users/login', {title: 'Login', userCheck:'This user not found'}));
//         }
//       } else next(res.send('Insufficient Data').status(404));

// })

module.exports = router;