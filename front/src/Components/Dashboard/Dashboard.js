import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import History from '../History/History';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="amount-con">
                        <div className="income">
                            <h2>Total Income</h2>
                            <p>
                                {dollar} {totalIncome()}
                            </p>
                        </div>
                        <div className="expense">
                            <h2>Total Expense</h2>
                            <p>
                                {dollar} {totalExpenses()}
                            </p>
                        </div>
                        <div className="balance">
                            <h2>Total Balance</h2>
                            <p>
                                {dollar} {totalBalance()}
                            </p>
                        </div>
                    </div>
                    <div className="chart-con">
                        <Chart />
                    </div>
                    <div className="history-con">
                        <History />
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        gap: 2rem;

        .amount-con {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            
            .income, .expense, .balance {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                p {
                    font-size: 2rem;
                    font-weight: 700;
                }
            }

            .balance p {
                color: var(--color-green);
                opacity: 0.6;
                font-size: 2.5rem;
            }
        }

        .chart-con {
            grid-column: 1 / -1;
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 2rem;
            height: 500px;
        }

        .history-con {
            grid-column: 1 / -1;
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 2rem;
        }
    }
`;

export default Dashboard;
