const express = require('express');
const router = express.Router();


// Read and add update date to files
const path = require('path');
const updateData = require('../utilities/update-data-files');
const dataFilePath = path.join(__dirname, '../data/users.js');

router.route('/api').get((req, res) => {
        let users = updateData.loadData(dataFilePath);
        res.json({ users });
    });

router.route('/register').get((req,res)=> {
        res.render('register', {title: 'Register Form', userExist:''});
 })


router.post('/add',(req, res,next) => {
  
    if (req.body.userName && req.body.login && req.body.password) {

        let users = updateData.loadData(dataFilePath);
        if (users.find((u) => u.login == req.body.login)) {
            next(res.render('register', {title: 'Register Form', userExist:'This user has already existed'}));
          }
        else {

        const user = {
          id: users[users.length - 1].id + 1,
          userName: req.body.userName,
          login: req.body.login,
          password: req.body.password,
        };
        
        users.push(user);
        updateData.saveData(users, dataFilePath);
        res.redirect(`/dashboard/${user.id}`)

        }
      } else next(res.send('Insufficient Data').status(404));
});


router.route('/login').get((req,res)=> {
    res.render('login', {title: 'Login', userCheck: ''});
  });

  
router.get('/login/check',(req, res, next) => {

    if (req.query.login && req.query.password) {
        let users = updateData.loadData(dataFilePath);
        let user = users.find((u) => u.login == req.query.login)

        if (user.login == req.query.login) {
            if (user.password == req.query.password){
             res.redirect(`/balance/${user.id}`)}
            else { next(res.redirect('/users/login'));
            }
          }
          
        else {
            next(res.render('/users/login', {title: 'Login', userCheck:'This user not found'}));
        }
      } else next(res.send('Insufficient Data').status(404));

})

module.exports = router;