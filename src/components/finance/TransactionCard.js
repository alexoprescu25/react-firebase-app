import React from 'react';
import '../style/finance.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTrash,
    faArrowTrendUp,
    faArrowTrendDown
} from '@fortawesome/free-solid-svg-icons';
import {
    deleteDoc,
    doc
} from 'firebase/firestore';
import { db } from '../../firebase';

function TransactionCard( { posts } ) {

    const handleDelete = async (e) => {
        const transactionDoc = doc(db, 'transactions', e.currentTarget.id);
        await deleteDoc(transactionDoc);
    }

    return (
        <>
            { posts ? 
                posts.map((item) => (
                    <tr className='transaction-card' key={ posts.indexOf(item) } >
                        <td>
                            { item.type === 'income' ? 
                                <p className='trend-up'><FontAwesomeIcon icon={faArrowTrendUp} /> { item.title } </p> 
                            : <p className='trend-down'><FontAwesomeIcon icon={faArrowTrendDown} /> { item.title } </p>  
                            }
                        </td>
                        <td>
                            <p className={ item.type === 'income' ? 'amount' : 'expense' }> 
                                { item.type === 'income' ? '+ ' + item.amount  : '- ' + item.amount } 
                            </p> 
                        </td>
                        <td>
                            <p className='source'> { item.source } </p>
                        </td>
                        <td>
                            <p className='date'> { item.date } </p>
                        </td>
                        <td>
                            <button className='delete-button' onClick={ handleDelete } id={ item.id }>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                )) : null
            }
        </>
    )
}

export default TransactionCard;