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
const subcategories = require("./routes/subcategories");



// Use our Routes
app.use("/api/users", users);
app.use("/api/transactions", transactions);
app.use("/api/balance", balance);
app.use("/api/subcategories", subcategories.Router);

//connect CSS file
const path = require('path');
app.use(express.static(path.join(__dirname, 'style')));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
    res.render('home', {title: 'Main'})
})


// Adding some HATEOAS links.
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/transactions",
        rel: "transactions",
        type: "GET",
      },
      {
        href: "api/transactions",
        rel: "transactions",
        type: "POST",
      },
      {
        href: "api/transactions",
        rel: "transactions",
        type: "DELETE",
      },
      {
        href: "api/balance",
        rel: "balance",
        type: "GET",
      },
      {
        href: "api/balance",
        rel: "balance",
        type: "POST",
      },
      {
        href: "api/subcategories",
        rel: "subcategories",
        type: "GET",
      },
    ],
  });
});




app.get('/register', (req,res)=> {
    res.render('register', {title: 'Register Form'
    });
})

app.get('/login', (req,res)=> {
    res.render('login', {title: 'Login'});
})

app.get('/help', (req, res) => {
    const subcategoriesDate = subcategories.Data;
    const categories = subcategories.CategoriesData
    res.render('help', { title: 'Knowledge Repository', subcategoriesDate, categories });
})

app.use((req,res) => {
    res.status(404).render('404', {title: 'Page not found'});
})


app.listen(port, ()=> {
    console.log('Server is listening on port: ' + port)
})