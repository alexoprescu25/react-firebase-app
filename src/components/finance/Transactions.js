import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';
import '../style/finance.css';
import Pagination from './Pagination';
import TransactionCard from './TransactionCard';

function Transactions() {

    const [transactions, setTransactions] = useState(null);

    const transactionsCollection = collection(db, 'transactions');

    useEffect(() => {
        const getTransactions = async () => {
            const data = await getDocs(transactionsCollection);
            setTransactions(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

            if(transactions) {
                console.log(transactions);
            }
        }

        getTransactions();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    const indexOfLastPost = currentPage * postsPerPage;
    const inedxOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = transactions ? transactions.slice(inedxOfFirstPost, indexOfLastPost) : null;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='transactions-container'>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Amount</td>
                            <td>Source</td>    
                            <td>Date</td>
                        </tr>    
                    </thead>
                    <tbody>      
                        <TransactionCard posts={ currentPosts } />
                    </tbody>    
                </table>
                { transactions ? <Pagination postsPerPage={ postsPerPage } totalPosts={ transactions.length } paginate={ paginate } /> : null }
            </div>
        </>
    )
}

export default Transactions;