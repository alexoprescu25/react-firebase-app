import React, { useEffect, useState } from 'react';
import '../style/auth.css';
import { db } from '../../firebase';
import {
    collection,
    addDoc
} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {

    const usersCollection = collection(db, "users");

    const history = useHistory();

    const errorMessages = {
        'username': 'Please enter your username!',
        'email': 'Please enter your email!',
        'password': 'Please enter your password!',
        'retype-password': 'Please retype your password!',
        'different-passwords': 'Please enter the same password!'
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

    useEffect(() => {
        document.querySelector('body').setAttribute('id', 'Register');
    }, []);

    const [formData, setFormData] = useState({
        'username': '',
        'email': '',
        'password': '',
        'retype-password': '',
        'registerDay': getCurrentDay(),
        'registerMonth': getCurrentMonth(),
        'registerYear': getCurrentYear(),
        'authToken': Math.floor(Math.random() * 1000000)
    });

    const [formError, setFormError] = useState({
        'username': '',
        'email': '',
        'password': '',
        'retype-password': '',
        'different-passwords': ''
    });

    const [globalErrorMessage, setErrorMessage] = useState('');
    const [globalSuccessMessage, setSuccessMessage] = useState('');
    const [isDirty, setDirty] = useState(false);

    function handleSuccessMessage(item) {
        setSuccessMessage(item);

        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
    }

    async function handleSubmit(e) {
        e.preventDefault(); 

        const isInvalid = await validateFormData();

        if(!isInvalid) {
            try {
                await addDoc(usersCollection, formData);
                handleSuccessMessage('Your account was created!');

                setTimeout(() => { history.push('/login') }, 2000);
            } catch(err) {
                console.log(err);
            }
        }
    }

    function handleInputChange(e) {
        setDirty(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...formError,
            [e.currentTarget.id]: ''
        }

        setFormError(newError);
    }

    function validateFormData(e) {
        const inputs = ['username', 'email', 'password', 'retype-password'];
        const newError = {...formError};
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if(formData['password'] !== formData['retype-password']) {
            newError['different-passwords'] = errorMessages['different-passwords'];
            isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }

    return (
        <>
        <div className='container'>
            <div className='register-box'>
                { globalSuccessMessage ? <div className='success-message'> { globalSuccessMessage } </div> : null }
                <div className='logo-container'>
                    <img src="https://i.ibb.co/Jp5Sxxd/ax-digital.png" />
                </div>
                <form onSubmit={ handleSubmit }>
                    <h1>Register</h1>
                    <p>Register on the AX-DIGITAL platform</p>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Username'
                            onChange={ handleInputChange }
                            value={ formData['username'] }
                            className={ formError['username'] ? 'error' : null }
                        />
                        { formError['username'] ? <p className='error-p'> { '*' + formError['username'] } </p> : null }
                    </div>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input 
                            type='text'
                            id='email'
                            name='email'
                            placeholder='Email Address'
                            onChange={ handleInputChange }
                            value={ formData['email'] }
                            className={ formError['email'] ? 'error' : null }
                        />
                        { formError['email'] ? <p className='error-p'> { '*' + formError['email'] } </p> : null }
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            onChange={ handleInputChange }
                            value={ formData['password'] }
                            className={ formError['password'] ? 'error' : null }
                        />
                        { formError['password'] ? <p className='error-p'> { '*' + formError['password'] } </p> : null }
                    </div>
                    <div>
                        <label htmlFor='retype-password'>Confirm Password</label>
                        <input 
                            type='password'
                            id='retype-password'
                            name='retype-password'
                            placeholder='Confirm Password'
                            onChange={ handleInputChange }
                            value={ formData['retype-password'] }
                            className={ formError['retype-password'] ? 'error' : null }
                        />
                        { formError['retype-password'] ? <p className='error-p'> { '*' + formError['retype-password'] } </p> : null }
                        { formError['different-passwords'] ? <p className='error-p'> { '*' + formError['different-passwords'] } </p> : null }
                    </div>
                    <div>
                        <button type='submit' disabled={ !isDirty }>Register</button>
                    </div>
                </form>
                <p className='log-in'> Already have an account?<Link to="/login">Log In Instead</Link> </p>
            </div>
        </div>
        </>
    )
}

export default Register;