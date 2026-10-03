# 🏦 Bank Account Management System

A full-stack Bank Account Management System built using Spring Boot, MySQL, HTML, CSS and JavaScript.

## 🚀 Features

- Create and manage bank accounts
- Display account details with Customer and Branch information
- JOIN query for account details
- Subquery to find accounts with balance above average
- Deposit money
- Withdraw money
- Stored procedures for transactions
- MySQL function to retrieve account balance
- Database trigger for automatic balance updates
- Delete accounts
- Responsive banking dashboard
- Docker support
- REST API

## 🛠️ Technologies Used

- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- HTML
- CSS
- JavaScript
- REST API
- Docker
- Git & GitHub

## 🗄️ Database

Database name:

`bankmanagement`

Main tables:

- `customers`
- `accounts`
- `branches`
- `transactions`

Database concepts implemented:

- JOIN
- Subquery
- Stored Procedure
- Function
- Trigger
- Foreign Keys

## 🔗 REST API

### Get all accounts

```text
GET /api/accounts
Get account details
GET /api/accounts/details
Get accounts above average balance
GET /api/accounts/above-average
Add account
POST /api/accounts
Deposit
POST /api/accounts/{accountId}/deposit
Withdraw
POST /api/accounts/{accountId}/withdraw
Get balance
GET /api/accounts/{accountId}/balance
Delete account
DELETE /api/accounts/{accountId}
