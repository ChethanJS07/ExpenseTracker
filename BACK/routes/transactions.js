const express = require('express');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { getTransactions } = require('../controllers/transactions');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Apply requireAuth middleware only to protected routes
router.post('/add-income', requireAuth, addIncome);
router.get('/get-incomes', requireAuth, getIncomes);
router.delete('/delete-income/:id', requireAuth, deleteIncome);
router.post('/add-expense', requireAuth, addExpense);
router.get('/get-expenses', requireAuth, getExpenses);
router.delete('/delete-expense/:id', requireAuth, deleteExpense);
router.get('/get-transactions', requireAuth, getTransactions); // New route to get all transactions

module.exports = router;
