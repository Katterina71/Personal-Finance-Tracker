
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
    console.log('1'+balance[0].month);
    console.log('2'+currentMonthYear);
    for (let i in balance ) {
    if (balance[i].month == currentMonthYear) {
        return balance[i].amount;
    }
    }
    if (!balance.month) return null; 
}

function getAllMonthTransactions(balance, date) {
    if (!Array.isArray(balance) || balance.length === 0) {
        console.log('Invalid or empty balance array.');
        return null;
    }

    let currentDate = new Date();
    let currentMonthYear = currentDate.toISOString().slice(0, 7);

    for (let item of balance) {
        if (item.month === currentMonthYear) {
            return item.amount;
        }
    }
    return null;
}

exports.loadData = loadData;
exports.saveData = saveData;
exports.getAmountIfCurrentMonth = getAmountIfCurrentMonth;
exports.getAllMonthTransactions = getAllMonthTransactions;




// exports.loadData = loadData;
// exports.saveData =  saveData;

