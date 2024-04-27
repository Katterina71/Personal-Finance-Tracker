
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

module.exports = {
    loadData,
    saveData
}

// exports.loadData = loadData;
// exports.saveData =  saveData;

