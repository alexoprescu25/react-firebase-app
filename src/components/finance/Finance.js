import React, { useEffect, useState } from 'react';
import '../style/finance.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowRight,
    faEuroSign,
    faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import AddIncome from './AddIncome';
import Transactions from './Transactions';
import { db } from '../../firebase';
import {
    collection,
    getDocs
} from 'firebase/firestore';


function Finance() {

    useEffect(() => {
        document.querySelector('body').setAttribute('id', 'Finance');
    }, []);

    const transactionsCollection = collection(db, 'transactions');
    const [transactions, setTransactions] = useState(null);
    const [income, setIncome] = useState({
        'transactions': false,
        'income': false,
        'expense': false
    });
    const buttonType = [
        { type: 'transactions', name: 'Transactions' },
        { type: 'income', name: 'Add Income' },
        { type: 'expense', name: 'Add Expense' }
    ]

    useEffect(() => {
        const getTransactions = async () => {
            const data = await getDocs(transactionsCollection);
            setTransactions(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getTransactions();
    }, []);

    function getAmount(type) {
        let total = 0;

        if(transactions) {
            for(const item of transactions) {
                if(item.type === type) {
                    total += Number(item.amount);
                }
            }
        }

        return total;
    }

    function getPercentage() {
        const totalIncome = getAmount('income');
        const totalExpenses = getAmount('expense');
        let percentage = 0;

        if(totalIncome && totalExpenses) {
            percentage = (totalExpenses * 100) / totalIncome;
        }

        return percentage;
    }

    function handleComponent(e) {
        e.currentTarget.classList.add('isActive');
        setIncome({[e.currentTarget.id]: true});
    }

    return (
        <>
        <div className='finance-section'>
            <div className='container'>
                <div className='top-container'>
                    <div className='income-card'>
                        <p>Total Balance</p>
                        <p><span>RON</span> { transactions ? getAmount('income') : '0' } </p>
                        <div className='available-currency'>
                            <p>Available Currency</p>
                            <ul>
                                <li>
                                    <p><span><FontAwesomeIcon icon={faDollarSign} /></span>US Dollars</p>
                                    <p>$ { (getAmount('income') / 4.5 ).toFixed(2) } </p>
                                </li>
                                <li>
                                    <p><span><FontAwesomeIcon icon={faEuroSign} /></span>Euro</p>
                                    <p>€ { (getAmount('income') / 4.94).toFixed(2) }</p>
                                </li>
                            </ul>
                        </div>
                        <div className='buttons'>
                            <button>Add money<FontAwesomeIcon icon={faArrowRight} /></button>
                        </div>
                    </div>
                    <div className='transactions'>
                        <div className='buttons'>
                            { buttonType.map((button) => (
                                <button
                                    onClick={ handleComponent }
                                    id={ button.type }
                                    className={ income[button.type] ? 'isActive' : null }
                                    key={ buttonType.indexOf(button) }
                                >
                                    { button.name }
                                </button>
                            )) }
                        </div>
                        <div className='content-box'>
                            <div className='add-income-box'>
                                {   income['income'] ? <AddIncome /> : 
                                    income['transactions'] ? <Transactions /> : <p className='choose'>Choose an option</p> 
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='analytics'>
                    <div className='expenses-card'>
                        <div className='top-card'>
                            <p>Total Expenses</p>
                            <p> { getAmount('expense') } </p>
                        </div>
                        <div className='expenses-percent'>
                            <p> { getPercentage() ? getPercentage().toFixed(2) + '%' : null } </p> 
                            <progress id="file" max="100" value={ getPercentage() }></progress>
                        </div>
                        <div className='result'>
                            { Number(getPercentage()) > 100 ? 
                            <p>You're expenses are bigger than income. Do something to fix this!</p> : 
                            <p>You're expenses are not bigger than income. Keep up the good work!</p>    
                            }
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Finance;