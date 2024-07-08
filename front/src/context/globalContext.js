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
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        response => response,
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
            getTransactions();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);

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
            getTransactions();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);

    const totalBalance = () => totalIncome() - totalExpenses();

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
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 5);
    };

    const deleteTransaction = async (id) => {
        try {
            const transaction = transactions.find(tran => tran._id === id);
            if (transaction.type === 'income') {
                await deleteIncome(id);
            } else {
                await deleteExpense(id);
            }
            getTransactions(); // Refresh the transactions list
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const updateTransaction = async (id, updatedData) => {
        try {
            const transaction = transactions.find(tran => tran._id === id);
            if (transaction.type === 'income') {
                await axiosInstance.put(`update-income/${id}`, updatedData);
                getIncomes();
            } else {
                await axiosInstance.put(`update-expense/${id}`, updatedData);
                getExpenses();
            }
            getTransactions(); // Refresh the transactions list
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        if (user) {
            getIncomes();
            getExpenses();
        }
    }, [user, getIncomes, getExpenses]);

    useEffect(() => {
        if (user) {
            getTransactions();
        }
    }, [user, getTransactions]);

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

export const useGlobalContext = () => useContext(GlobalContext);
