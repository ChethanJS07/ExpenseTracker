const ExpenseSchema = require("../models/expenseModels");
const Transaction = require("../models/transactionModels");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const user_id = req.user._id; // Assuming user ID is available in req.user._id

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user_id // Assign user_id to the expense
    });

    const transaction = new Transaction({
        title,
        amount,
        category,
        description,
        date,
        type: 'expense',
        user_id // Assign user_id to the transaction
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        await expense.save();
        await transaction.save();

        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const user_id = req.user._id; // Assuming user ID is available in req.user._id
        const expenses = await ExpenseSchema.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseSchema.findOneAndDelete({ _id: id, user_id: req.user._id });
        await Transaction.findOneAndDelete({ originalId: id, type: 'expense', user_id: req.user._id });
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;
    const user_id = req.user._id;

    try {
        const updatedExpense = await ExpenseSchema.findOneAndUpdate(
            { _id: id, user_id },
            { title, amount, category, description, date },
            { new: true }
        );

        await Transaction.findOneAndUpdate(
            { originalId: id, type: 'expense', user_id },
            { title, amount, category, description, date },
            { new: true }
        );

        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
