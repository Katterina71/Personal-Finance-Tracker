
// - **Category**: Examples include groceries, utilities, salary, investments, and more.
// - **Amount**: The monetary value of the transaction.
// - **Date**: The date the transaction occurred.
// - **Description**: A brief description or notes about the transaction.
// - **Card Name**: Which card is used for payment.

const transaction = [
    {
        "id": 1,
        "userId": 1,
        "subCategoryId": 'Groceries',
        "amount": 100.25,
        "date": "2024-04-24",
        "description": "Supermarket shopping for weekly groceries",
        "cardName": "Debit Card",
        "type": "Expense",
    },
    {
        "id": 2,
        "userId": 1,
        "subCategoryId": 3,
        "amount": 150.75,
        "date": "2024-04-23",
        "description": "Monthly electricity and water bills",
        "cardName": "Credit Card",
        "type": "Expense",
    },
    {
        "id": 3,
        "userId": 1,
        "subCategoryId": 2,
        "amount": 3200.00,
        "date": "2024-04-15",
        "description": "Monthly salary credited",
        "cardName": "Direct Deposit",
        "type": "Income",
    },
    {
        "id": 4,
        "userId": 2,
        "subCategoryId": 1,
        "amount": 500.00,
        "date": "2024-04-20",
        "description": "Investment in mutual funds",
        "cardName": "Brokerage Account",
        "type": "Expense",
    },
    {
        "id": 5,
        "userId": 2,
        "subCategoryId": 1,
        "amount": 80.00,
        "date": "2024-04-22",
        "description": "Tickets for a concert",
        "cardName": "Credit Card",
        "type": "Expense",
    }
]



module.exports = transaction;