// controllers/income.js

const IncomeSchema = require("../models/incomeModels");
const Transaction = require("../models/transactionModels");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const user_id = req.user._id; // Assuming user ID is available in req.user._id

    const income = new IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        user_id // Assign user_id to the income
    });

    const transaction = new Transaction({
        title,
        amount,
        category,
        description,
        date,
        type: 'income',
        user_id // Assign user_id to the transaction
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        await income.save();
        await transaction.save();

        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const user_id = req.user._id; // Assuming user ID is available in req.user._id
        const incomes = await IncomeSchema.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        await IncomeSchema.findOneAndDelete({ _id: id, user_id: req.user._id });
        await Transaction.findOneAndDelete({ originalId: id, type: 'income', user_id: req.user._id });
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;
    const user_id = req.user._id;

    try {
        const updatedIncome = await IncomeSchema.findOneAndUpdate(
            { _id: id, user_id },
            { title, amount, category, description, date },
            { new: true }
        );

        await Transaction.findOneAndUpdate(
            { originalId: id, type: 'income', user_id },
            { title, amount, category, description, date },
            { new: true }
        );

        res.status(200).json(updatedIncome);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
