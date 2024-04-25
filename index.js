const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

const error = require("./utilities/error.js");

//register view engine
let ejs = require('ejs');
app.set('view engine', 'ejs');

const users = require("./routes/users.js");
const transactions = require("./routes/transactions");
const balance = require("./routes/balance");


// Use our Routes
app.use("/api/users", users);
app.use("/api/transactions", transactions);
app.use("/api/balance", balance);

//connect CSS file
const path = require('path');
app.use(express.static(path.join(__dirname, 'style')));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
    res.render('home')
})



//404 Error - Page Unavailable
// app.use((req,res,next) => {
//     next(error(404, "Ooops.. Page Not found!"))
// });
app.use((req,res) => {
    res.status(404).render('404');
})

app.listen(port, ()=> {
    console.log('Server is listening on port: ' + port)
})