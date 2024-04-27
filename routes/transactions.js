const express = require('express');
const router = express.Router();

const subcategories = require('./subcategories')

// Read and add update date to files
const path = require('path');
const updateData = require('../utilities/update-data-files');
const dataFilePath = path.join(__dirname, '../data/transactions.js');

router.route('/api').get((req, res) => {
        let transactions = updateData.loadData(dataFilePath);
        res.json({ transactions });
    });

router.route('/:id/create').get((req,res)=> {
        const userId = req.params.id; 
        const subcategoriesDate = subcategories.Data;
        res.render('transaction', {title: 'Create transaction', userId, subcategoriesDate});
 })


 router.post('/:id/create',(req, res, next) => {
    
    console.log(req.body);
    console.log(req.params);
    
    if (req.body.subCategory && req.body.amount && req.body.date) {
        let transactions = updateData.loadData(dataFilePath);

        const transaction = {
          id: transactions[transactions.length - 1].id + 1,
          userId: req.params.id,
          subCategoryId: req.body.subCategory,
          amount: req.body.amount,
          date: req.body.date,
          description: req.body.description,
          cardName: req.body.cardName,
          type: req.body.type,
        };
        
        transactions.push(transaction);
        updateData.saveData(transactions, dataFilePath);
        res.redirect(`/dashboard/${req.params.id}`)

      } else next(res.send('Insufficient Data').status(404));
});

router.route('/:userId/')
.get((req,res) => {
   

    const userId = req.params.userId;
    const transactionId = req.query.transaction;

    let transactions = updateData.loadData(dataFilePath);
    let transaction = transactions.find(t => {
        if (t.id == transactionId &&  t.userId == userId){
            return t;
        }
    })
    
    const categoriesDate = subcategories.CategoriesData;
    const subcategoriesDate = subcategories.Data;

    console.log(transaction.subCategoryId);

    const subcategory = subcategoriesDate.find(sc => sc.id == transaction.subCategoryId);
    const category = categoriesDate.find(c => c.id == subcategory.categoryId);

    res.render('transaction-update', {title: 'Change transaction', userId, transactionId, transaction, category, subcategory} )
}) 

.delete((req, res, next) => {
        console.log('click');

        const userId = req.params.userId;
        const transactionId = req.query.transaction;

        console.log(userId);
        console.log(transactionId);

        let transactions = updateData.loadData(dataFilePath);
        const transaction = transactions.find((t, i) => {
            if (t.id == transactionId && t.userId == userId) {
                transactions.splice(i, 1);
              return true;
            }
          });
          

          if (transaction)  {
            updateData.saveData(transactions, dataFilePath)
            res.redirect(`/dashboard/${userId}`);
        }
          else next();
     
})


module.exports = router;