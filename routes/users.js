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
        res.redirect(`/dashboard/${user.userName}`)

        }
      } else next(res.send('Insufficient Data').status(404));
});



module.exports = router;