import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'; // Import delete and edit icons from react-icons

const YourTransactions = () => {
    const { transactions, getTransactions, deleteTransaction, updateTransaction } = useGlobalContext();
    const [editableTransaction, setEditableTransaction] = useState(null); // State to store editable transaction
    const [editedData, setEditedData] = useState({}); // State to store edited data
    const [filteredTransactions, setFilteredTransactions] = useState([]); // State to store filtered transactions
    const [sortType, setSortType] = useState(''); // State to store current sorting type

    useEffect(() => {
        getTransactions(); // Fetch transactions when component mounts
    }, [getTransactions]);

    useEffect(() => {
        setFilteredTransactions(transactions); // Initialize filtered transactions with all transactions
    }, [transactions]);

    if (transactions === undefined) {
        return <p>Loading...</p>; // Handle initial loading state
    }

    // Function to handle deletion of a transaction
    const handleDelete = (id) => {
        deleteTransaction(id); // Call deleteTransaction function from global context
    };

    // Function to handle edit mode for a transaction
    const handleEdit = (transaction) => {
        setEditableTransaction(transaction); // Set the transaction to be edited
        setEditedData({
            ...transaction,
            date: new Date(transaction.date).toISOString().split('T')[0] // Format date for input (YYYY-MM-DD)
        });
    };

    // Function to handle input change in edit mode
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    // Function to handle saving edited transaction
    const handleSave = () => {
        updateTransaction(editableTransaction._id, editedData); // Call updateTransaction function from global context
        setEditableTransaction(null); // Clear editable transaction after saving
    };

    // Function to handle sorting transactions based on a given key and order
    const handleSort = (key, order) => {
        const sortedTransactions = [...filteredTransactions].sort((a, b) => {
            if (order === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setFilteredTransactions(sortedTransactions);
        setSortType(key); // Set the current sort type for highlighting
    };

    // Function to handle filtering transactions based on type (income/expense)
    const handleFilter = (type) => {
        const filtered = transactions.filter(transaction => transaction.type === type);
        setFilteredTransactions(filtered);
    };

    // Function to show all transactions
    const handleShowAll = () => {
        setFilteredTransactions(transactions);
    };

    return (
        <TransactionStyled>
            <InnerLayout>
                <div className="transaction-container">
                    <h2>Your Transactions</h2>
                    <div className="transaction-actions">
                        {/* Dropdown menu for sorting */}
                        <select onChange={(e) => handleSort(e.target.value, 'asc')}>
                            <option value="">Sort By</option>
                            <option value="title">Title (A-Z)</option>
                            <option value="amount">Amount (Low to High)</option>
                            <option value="category">Category</option>
                            <option value="date">Date</option>
                        </select>
                        {/* Buttons for filtering */}
                        <button onClick={() => handleFilter('income')}>Show Only Income</button>
                        <button onClick={() => handleFilter('expense')}>Show Only Expense</button>
                        {/* Button to show all transactions */}
                        <button onClick={handleShowAll}>Show All Transactions</button>
                    </div>
                    <div className="transaction-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Action</th> {/* New column for actions */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((transaction, index) => (
                                    <tr key={transaction._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {editableTransaction?._id === transaction._id ? (
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={editedData.title}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                transaction.title
                                            )}
                                        </td>
                                        <td className={transaction.type === 'income' ? 'positive' : 'negative'}>
                                            {transaction.type === 'income' ? `+${transaction.amount}` : `-${transaction.amount}`}
                                        </td>
                                        <td>
                                            {editableTransaction?._id === transaction._id ? (
                                                <input
                                                    type="text"
                                                    name="category"
                                                    value={editedData.category}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                transaction.category
                                            )}
                                        </td>
                                        <td>
                                            {editableTransaction?._id === transaction._id ? (
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={editedData.description}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                transaction.description
                                            )}
                                        </td>
                                        <td>{new Date(transaction.date).toLocaleDateString('en-GB')}</td>
                                        <td>{transaction.type}</td>
                                        <td>
                                            {editableTransaction?._id === transaction._id ? (
                                                <SaveButton onClick={handleSave}>Save</SaveButton>
                                            ) : (
                                                <>
                                                    <ActionButton onClick={() => handleDelete(transaction._id)}>
                                                        <AiOutlineDelete />
                                                    </ActionButton>
                                                    <ActionButton onClick={() => handleEdit(transaction)}>
                                                        <AiOutlineEdit />
                                                    </ActionButton>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </InnerLayout>
        </TransactionStyled>
    );
};

const TransactionStyled = styled.div`
    .transaction-container {
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
        margin-top: 20px;
    }

    .transaction-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    h2 {
        color: #333;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .transaction-table {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        background-color: #fff;
    }

    th,
    td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #f0f0f0;
    }

    th {
        background-color: #f7f7f7;
        font-size: 14px;
        font-weight: bold;
        color: #333;
    }

    td {
        font-size: 14px;
        color: #555;
    }

    .positive {
        color: green;
    }

    .negative {
        color: red;
    }
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 10px;
`;

const SaveButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
`;

export default YourTransactions;
