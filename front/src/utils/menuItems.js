import { calender, dashboard, expenses, transactions, trend } from "./Icons";
import styled from 'styled-components';

function getFormattedDate() {
    const date = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/\s/g, ' ');
}

const currentDate = `Today: ${getFormattedDate()}`;

// Styled component for the calendar item
const CalenderItem = styled.div`
    font-weight: bold;
    color: green;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
        margin-right: 10px;
    }

    .icon {
        margin-right: 10px;
        display: inline-flex;
    }
`;

export const menuItems = [
    {
        id: 0,
        title: currentDate,
        icon: calender,
        Component: () => (
            <CalenderItem>
                <div className="icon">{calender}</div>
                {currentDate}
            </CalenderItem>
        ),
    },
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
];
