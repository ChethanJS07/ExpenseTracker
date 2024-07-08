import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const BASE_URL = "http://localhost:3000/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { user } = useAuthContext(); 
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    axiosInstance.interceptors.request.use(
        config => {
            const token = user ? user.token : null;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log("Request Config: ", config); // Add this line for debugging
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized error:", error.response.data);
            }
            return Promise.reject(error);
        }
    );

    const addIncome = async (income) => {
        try {
            await axiosInstance.post('add-income', income);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'Cannot Fetch Add-income API');
        }
    };

    const getIncomes = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`, {
                headers: {
                    Authorization: user ? `Bearer ${user.token}` : undefined,
                    'Content-Type': 'application/json'
                }
            });
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    }, [user]);

    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(`delete-income/${id}`);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    const addExpense = async (expense) => {
        try {
            await axiosInstance.post('add-expense', expense);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const getExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`, {
                headers: {
                    Authorization: user ? `Bearer ${user.token}` : undefined,
                    'Content-Type': 'application/json'
                }
            });
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    }, [user]);

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(`delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const getTransactions = useCallback(async () => {
        try {
            const incomeResponse = await axios.get(`${BASE_URL}get-incomes`, {
                headers: {
                    Authorization: user ? `Bearer ${user.token}` : undefined,
                    'Content-Type': 'application/json'
                }
            });
            const expenseResponse = await axios.get(`${BASE_URL}get-expenses`, {
                headers: {
                    Authorization: user ? `Bearer ${user.token}` : undefined,
                    'Content-Type': 'application/json'
                }
            });
            const combinedTransactions = [...incomeResponse.data, ...expenseResponse.data];
            combinedTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTransactions(combinedTransactions);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    }, [user]);

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 5)
    }
    const deleteTransaction = (id) => {
        // Implementation to delete transaction by id
        setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== id));
    };

    const updateTransaction = (id, updatedData) => {
        // Make an API call to update the transaction on the server
        // Replace this with your actual implementation
        console.log(`Updating transaction with ID ${id} with data:`, updatedData);
        
        // Assuming transactions is an array of objects and updating one of them
        const updatedTransactions = transactions.map(transaction =>
            transaction._id === id ? { ...transaction, ...updatedData } : transaction
        );

        setTransactions(updatedTransactions);
    };

    useEffect(() => {
        if (user) {
            getIncomes();
            getExpenses();
        }
    }, [user, getIncomes, getExpenses]);

    useEffect(() => {
        if (user && incomes.length && expenses.length) {
            getTransactions();
        }
    }, [user, incomes, expenses, getTransactions]);

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactions,
            getTransactions,
            error,
            setError,
            transactionHistory,
            deleteTransaction,
            updateTransaction

        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
