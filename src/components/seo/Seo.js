import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowRight,
    faCopy
} from '@fortawesome/free-solid-svg-icons';
import '../style/seo.css';
import { Link } from 'react-router-dom';

function Seo() {

    useEffect(() => {
        document.querySelector('body').setAttribute('id', 'Seo');
    }, []);

    const [address, setAddress] = useState('');
    const [table, setTable] = useState([]);


    function handleValue() {
        if(address) {
            const array = address.split('/');
            const path = array[array.length - 1];
            const words = path.split('-').join(" ");

            setTable([...table, {
                'link': address, 
                'words': words,
                'date': getCurrentMonth()
            }]);

            console.log(table);

            return words;
        }
    }

    function handleInputChange(e) {
        setAddress(e.currentTarget.value);
        console.log(address);
    }

    function getCurrentMonth() {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const d = new Date();
        
        return month[d.getMonth()];
    }

    return (
        <>
        <div className='seo-box'>
            <div className='container'>
                <div className='add-link'>
                    <input 
                        type='text'
                        id='link'
                        name='link'
                        placeholder='Type your link'
                        onChange={ handleInputChange }
                        value={ address }
                    />
                    <button onClick={ handleValue }>Post<FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
                { table.length ?
                <div className='seo-items'>
                    <table>
                        <thead>
                            <tr>
                                <td>Keywords</td>
                                <td>Used</td>
                                <td>Date</td>
                                <td>Page</td>
                            </tr>
                        </thead>
                        <tbody>
                            { table.map((item) => (
                                <tr key={ table.indexOf(item) }>
                                    <td></td>
                                    <td> 
                                        { item.words } 
                                        <button 
                                            className='copy-button'
                                            onClick={ (e) => { navigator.clipboard.writeText(item.words); } }
                                        >
                                            <FontAwesomeIcon icon={faCopy} />
                                        </button>
                                    </td>
                                    <td> { item.date } </td>
                                    <td>
                                        <Link to={{ pathname: item.link }} target="_blank"> { item.link } </Link>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                    <div className='seo-buttons'>
                        <button className='reset-btn'>Reset</button>
                        <button className='post-btn'>Post</button>
                    </div>
                </div> : null    
                }
            </div>
        </div>
        </>
    )
}

export default Seo;