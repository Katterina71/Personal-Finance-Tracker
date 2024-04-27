const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');


router.route('/api').get((req, res) => {
        res.json({ users });
    });

router.route('/register').get((req,res)=> {
        res.render('register', {title: 'Register Form'});
 })



router.post('/add',(req, res,next) => {
    console.log(req.method);
    if (req.body.userName && req.body.login && req.body.password) {

        let users = loadData();
        if (users.find((u) => u.login == req.body.login)) {
            next(res.send('This user exists!').status(404));
          }
        else {

        const user = {
          id: users[users.length - 1].id + 1,
          userName: req.body.userName,
          login: req.body.login,
          password: req.body.password,
        };
        
        users.push(user);
        saveData(users);

        res.send('User updated successfully');

        }
      } else next(res.send('Insufficient Data').status(404));
});

// Read and add update date to files
const dataFilePath = path.join(__dirname, '../data/users.js');

function loadData() {
    try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileData);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

function saveData(data) {
    try {
        const dataString = JSON.stringify(data, null, 2);
        fs.writeFileSync(dataFilePath, dataString, 'utf8');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}


module.exports = router;