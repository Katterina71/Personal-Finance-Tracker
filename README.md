# Personal Finance Tracker

The Personal Finance Tracker is a web application designed to help users manage their finances efficiently. 
Built with Node.js and Express, this app allows users to track transactions, manage balances, and categorize spending effectively.

## Features

- **RESTful API**: Built using Express to handle CRUD operations for users, transactions, and categories.
- **Express Middleware**: Custom middleware for request processing, logging, and authentication.
- **EJS Templating**: Server-side rendering of HTML views using EJS to display dynamic data.
- **Form Interactions**: Users can create, update, and delete transactions and categories through HTML forms.
- **Monthly Balance Updates**: Automatically update and display balance changes each month.
- **Help Section**: Includes detailed information on various categories and subcategories to assist users in categorizing transactions.
  
## Components

- **Transaction Management**: Users can create, modify, and delete transactions easily.
- **Monthly Balance Updates**: Automatically updates and displays balance changes each month.
- **Categorization**: Organize expenses into categories and subcategories.
- **Help List**: Provides detailed information on how to categorize transactions.
- **Dynamic Data Visualization**: Visual representation of financial data to enhance user understanding.

## Data Structure

The application utilizes a robust JSON-based data structure comprising:

- **User**: Stores user information.
- **Transactions**: Records details of each financial transaction.
- **Balance**: Keeps track of monthly financial balances.
- **Categories/Subcategories**: Organizes expenses into manageable groups.

An illustrative diagram of the data structure is included to help understand the relationships between different entities. 

![Data Structure](https://github.com/Katterina71/Personal-Finance-Tracker/blob/main/dataScheme/PersonalFinanceTracker.png) <!-- Update with the path to your image -->


### Prerequisites

- Node.js
- npm (Node Package Manager)


### Installation

1. **Clone the repository (optional):**
   ```bash
   git clone https://github.com/yourusername/personal-finance-tracker.git
   cd personal-finance-tracker
