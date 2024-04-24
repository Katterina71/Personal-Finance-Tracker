const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;


// const bodyParser = require("body-parser");

const users = require("./routes/users.js");
const transactions = require("./routes/transactions");
const balance = require("./routes/balance");


// Use our Routes
app.use("/api/users", users);
app.use("/api/transactions", transactions);
app.use("/api/balance", balance);

//connect css file
const path = require('path');
app.use(express.static(path.join(__dirname, 'styles')));


app.listen(port, ()=> {
    console.log('Server is listening on port: ' + port)
})