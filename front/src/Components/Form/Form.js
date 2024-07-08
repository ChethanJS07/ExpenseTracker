import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';

function Form() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: null,
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('')
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (title && amount && date && category) {
            addIncome(inputState);
            setInputState({
                title: '',
                amount: '',
                date: null,
                category: '',
                description: '',
            });
        } else {
            setError('Please fill in all required fields');
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <h2>Add New Income</h2>
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name="title" 
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    value={amount}  
                    type="text" 
                    name="amount" 
                    placeholder="Salary Amount"
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id="date"
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                />
            </div>
            <div className="selects input-control">
                <select 
                    required 
                    value={category} 
                    name="category" 
                    id="category" 
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder="Add A Reference" 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <button type="submit">Add Income</button>
            </div>
            {error && <p className="error">{error}</p>}
        </FormStyled>
    );
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
        text-align: center;
        font-weight: bold;
    }

    .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        
        input, select, textarea {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
        }
        
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #007bff;
        }
    }

    .selects {
        select {
            height: 2.5rem;
        }
    }

    .submit-btn {
        display: flex;
        justify-content: center;
        
        button {
            padding: 0.5rem 2rem;
            border: none;
            border-radius: 4px;
            background: #007bff;
            color: #fff;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;

            &:hover {
                background: #0056b3;
            }
        }
    }

    .error {
        color: red;
        font-size: 0.875rem;
        text-align: center;
        margin-top: 1rem;
    }
`;

export default Form;
