
const fs = require('fs');

function loadData(dataFilePath) {
    try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileData);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

function saveData(data, dataFilePath) {
    try {
        const dataString = JSON.stringify(data, null, 2);
        fs.writeFileSync(dataFilePath, dataString, 'utf8');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}


function getAmountIfCurrentMonth(balance) {
    let currentDate = new Date(); 
    let currentMonthYear = currentDate.toISOString().slice(0, 7);

    if (balance.month === currentMonthYear) {
        return balance.amount;
    }
    return null; 
}

function getAllMonthTransactions(transaction, date) {
    let monthNumber = date.getMonth() + 1; 
    let yearNumber = date.getFullYear(); 
    const datePrefix = `${yearNumber}-${monthNumber.toString().padStart(2, '0')}`;

    return transaction.filter(transaction => {
        const transactionDatePrefix = transaction.date.slice(0, 7);
        return transactionDatePrefix === datePrefix;
    });
}

exports.loadData = loadData;
exports.saveData = saveData;
exports.getAmountIfCurrentMonth = getAmountIfCurrentMonth;
exports.getAllMonthTransactions = getAllMonthTransactions;




// exports.loadData = loadData;
// exports.saveData =  saveData;

