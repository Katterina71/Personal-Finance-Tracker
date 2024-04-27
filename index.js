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


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Use our Routes
app.use("/users", users.Router);
app.use("/balance", balance);
app.use("/subcategories", subcategories.Router);
app.use("/transactions", transactions);

//check
// app.use((req, res, next) => {
//   console.log('Request Type:', req.method);
//   console.log('Content Type:', req.headers['content-type']);
//   next();
// });

//connect CSS file
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
    res.render('home', {title: 'Main'})
})

app.get('/help', (req, res) => {
    const subcategoriesDate = subcategories.Data;
    const categories = subcategories.CategoriesData
    res.render('help', { title: 'Knowledge Repository', subcategoriesDate, categories });
})

app.get('/dashboard/:id', (req,res)=> {

  const usersData = users.UsersData;
  console.log(usersData);
  const id = req.params.id
  let user = usersData.find(u => u.id == id)
  res.render('dashboard', {title: 'dashboard', user, balance: '100', today: '2024-04-27', });
})


app.use((req,res) => {
    res.status(404).render('404', {title: 'Page not found'});
})


app.listen(port, ()=> {
    console.log('Server is listening on port: ' + port)
})