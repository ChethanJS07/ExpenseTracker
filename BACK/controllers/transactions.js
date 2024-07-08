// controllers/transactions.js

const Transaction = require("../models/transactionModels");

exports.getTransactions = async (req, res) => {
    try {
        const user_id = req.user._id; // Assuming user ID is available in req.user._id
        const transactions = await Transaction.find({ user_id }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
