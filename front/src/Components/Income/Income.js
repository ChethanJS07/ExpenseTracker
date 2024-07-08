import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        getIncomes();
    }, [getIncomes]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredIncomes = selectedCategory === 'All'
        ? incomes.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4)
        : incomes.filter(income => income.category === selectedCategory);

    const totalCategoryIncome = filteredIncomes.reduce((acc, income) => acc + income.amount, 0);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1><b>Incomes</b></h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        <div className="category-filter">
                            <label htmlFor="category">Filter by Category:</label>
                            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="All">All</option>
                                {Array.from(new Set(incomes.map(income => income.category))).map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        {selectedCategory !== 'All' && (
                            <h2 className="category-total">Total {selectedCategory} Income: <span>${totalCategoryIncome.toFixed(2)}</span></h2>
                        )}
                        {filteredIncomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteIncome}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
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
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
            .category-filter {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 1rem;
                label {
                    margin-right: 0.5rem;
                }
                select {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
            }
            .category-total {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 10px;
                padding: 0.5rem;
                margin: 1rem 0;
                font-size: 1.5rem;
                gap: .5rem;
                span {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--color-green);
                }
            }
        }
    }
`;

export default Income;
