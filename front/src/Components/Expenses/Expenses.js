import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from '../Expenses/ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';
import { useAuthContext } from '../../hooks/useAuthContext';

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses, totalBalance } = useGlobalContext();
    const { user } = useAuthContext();

    useEffect(() => {
        if (user) {
            getExpenses(user.token); // Pass the token to getExpenses
        }
    }, [getExpenses, user]);

    const recentExpenses = expenses
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);

    const handleDeleteExpense = async (id) => {
        try {
            await deleteExpense(id, user.token);
        } catch (err) {
            console.error('Error deleting expense:', err);
        }
    };

    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expenses">Total Expenses: <span className="total-expenses-amount">${totalExpenses()}</span></h2>
                <h2 className="total-balance">Available Balance: <span className="total-balance-amount">${totalBalance()}</span></h2>
                <div className="expenses-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {recentExpenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-red)"
                                deleteItem={handleDeleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpensesStyled>
    );
}

const ExpensesStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expenses, .total-balance {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
    }
    .total-expenses {
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: red; /* Set the color directly here */
        }
    }
    .total-balance {
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green); /* Ensure this color is defined and used */
        }
    }
    .expenses-content {
        display: flex;
        gap: 2rem;
        .expenses {
            flex: 1;
        }
    }
`;

export default Expenses;
