import React, { useEffect, useState } from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Chart() {
    const { incomes, expenses } = useGlobalContext();
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (incomes && expenses) {
            const aggregateAmountsByDate = (transactions) => {
                return transactions.reduce((acc, transaction) => {
                    const date = dateFormat(transaction.date);
                    if (!acc[date]) {
                        acc[date] = 0;
                    }
                    acc[date] += transaction.amount;
                    return acc;
                }, {});
            };

            const aggregatedIncomes = aggregateAmountsByDate(incomes);
            const aggregatedExpenses = aggregateAmountsByDate(expenses);

            const dates = Array.from(new Set([...Object.keys(aggregatedIncomes), ...Object.keys(aggregatedExpenses)]));

            const data = {
                labels: dates,
                datasets: [
                    {
                        label: 'Income',
                        data: dates.map(date => aggregatedIncomes[date] || 0),
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        borderColor: 'green',
                        fill: false,
                        tension: 0.2,
                    },
                    {
                        label: 'Expenses',
                        data: dates.map(date => aggregatedExpenses[date] || 0),
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        borderColor: 'red',
                        fill: false,
                        tension: 0.2,
                    },
                ],
            };
            setChartData(data);
        }
    }, [incomes, expenses]);

    return (
        <ChartStyled>
            {chartData && chartData.labels && chartData.labels.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>No data available</p>
            )}
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 2rem;
    border-radius: 20px;
    height: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Chart;
