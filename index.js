const express = require('express');
const app = express();
const port = 3000;

//register view engine
let ejs = require('ejs');
app.set('view engine', 'ejs');

const subcategories = require("./routes/subcategories");
const users = require("./routes/users.js");
const balance =require("./routes/balance.js")
const transactions =require("./routes/transactions.js")
const updateData = require('./utilities/update-data-files');



const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Use our Routes
app.use("/users", users.Router);
app.use("/balance", balance.Router);
app.use("/subcategories", subcategories.Router);
app.use("/transactions", transactions.Router);

//check
// app.use((req, res, next) => {
//   console.log('Request Type:', req.method);
//   console.log('Content Type:', req.headers['content-type']);
//   next();
// });

//connect CSS file
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const dataFilePathTransactions = path.join(__dirname, './data/transactions.js');
const dataFilePathUser = path.join(__dirname, './data/users.js');
const dataFilePathBalance = path.join(__dirname, './data/balance.js');

app.get('/', (req,res) => {
    res.render('home', {title: 'Main'})
})

app.get('/help', (req, res) => {
    const subcategoriesDate = subcategories.Data;
    const categories = subcategories.CategoriesData
    res.render('help', { title: 'Knowledge Repository', subcategoriesDate, categories });
})

app.get('/dashboard/:id', (req,res)=> {

  const today = new Date();
  const dateString = today.toISOString().split('T')[0];

  //Find user
  const id = req.params.id
  let usersData = updateData.loadData(dataFilePathUser);
  let user = usersData.find(u => u.id == id)
  console.log(user);

  //Find current balance
  let usersBalance = updateData.loadData(dataFilePathBalance);
  let userBalance = usersBalance.filter(u => u.userId == id);

  const currentBudget = updateData.getAmountIfCurrentMonth(userBalance);
 

  //Find all transactions this month
  const allTransactions = updateData.loadData(dataFilePathTransactions);

  let userAllTransactions = allTransactions.filter(t =>t.userId == req.params.id);
  
  let userMonthTransactions = updateData.getAllMonthTransactions(userAllTransactions, today)
  
  res.render('dashboard', {title: 'Dashboard', user, currentBudget, today: dateString, userMonthTransactions});

})


app.use((req,res) => {
    res.status(404).render('404', {title: 'Page not found'});
})


app.listen(port, ()=> {
    console.log('Server is listening on port: ' + port)
})