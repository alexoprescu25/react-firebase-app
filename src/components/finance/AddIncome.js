import React, { useState } from 'react';
import '../style/finance.css';

import { db } from '../../firebase';
import {
    collection,
    addDoc
} from 'firebase/firestore';

function AddIncome() {

    const transactionsCollection = collection(db, "transactions");

    const [formData, setFormData] = useState({
        'amount': '',
        'date': '',
        'type': '',
        'currentDay': getCurrentDay(),
        'currentMonth': getCurrentMonth(),
        'currentYear': getCurrentYear(),
        'source': '',
        'method': '',
        'title': ''
    })

    const [globalSuccessMessage, setSuccessMessage] = useState('');

    function handleSuccessMessage(item) {
        setSuccessMessage(item);

        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
    }

    function getCurrentMonth() {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const d = new Date();
        
        return month[d.getMonth()];
    }

    function getCurrentDay() {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const d = new Date();
        let day = weekday[d.getDay()];

        return day;
    }

    function getCurrentYear() {
        const d = new Date();
        return d.getFullYear();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await addDoc(transactionsCollection, formData);

        handleSuccessMessage('Transaction added!')
    }

    function handleInputChange(e) {
        setFormData({...formData, [e.currentTarget.id]: e.currentTarget.value});
    }

    return (
        <>
        <div className='add-income'>
            { globalSuccessMessage ? <div className='success-message'> { globalSuccessMessage } </div> : null }
            <form>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input 
                        onChange={ handleInputChange }
                        value={ formData['title'] }
                        type='text'
                        id='title'
                        name='title'
                        placeholder='Title'
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input 
                        onChange={ handleInputChange }
                        value={ formData['amount'] }
                        type='number'
                        id='amount'
                        name='amount'
                        placeholder='Amount'
                    />
                </div>
                <div>
                    <label htmlFor='date'>Date</label>
                    <input 
                        onChange={ handleInputChange }
                        value={ formData['date'] }
                        type='date'
                        id='date'
                        name='date'
                        placeholder='Date'
                    />
                </div>
                <div>
                    <label htmlFor='type'>Type</label>
                    <select
                        onChange={ handleInputChange }
                        value={ formData['type'] }
                        id='type'
                    >
                        <option defaultValue={ ' ' } defaultChecked>Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='source'>Source</label>
                    <input 
                        onChange={ handleInputChange }
                        value={ formData['source'] }
                        type='text'
                        id='source'
                        name='source'
                        placeholder='Source'
                    />
                </div>
                <div>
                    <label htmlFor='method'>Method</label>
                    <select
                        onChange={ handleInputChange }
                        value={ formData['method'] }
                        id='method'
                    >
                        <option defaultValue={ ' ' } defaultChecked>Method</option>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                    </select>
                </div>
                <div>
                    <button onClick={ handleSubmit }>Save</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default AddIncome;