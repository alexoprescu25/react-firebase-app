import React, { useContext, useEffect, useState } from 'react';
import '../style/auth.css';
import { db } from '../../firebase';
import {
    collection,
    addDoc,
    getDocs
} from 'firebase/firestore';
import AuthContext from './AuthContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {

    const history = useHistory();

    const [users, setUsers] = useState(null);

    const errorMessages = {
        'username': '',
        'password': ''
    }

    const { setToken } = useContext(AuthContext);

    const usersCollection = collection(db, "users");

    useEffect(() => {
        document.querySelector('body').setAttribute('id', 'Register');
    }, []);

    const [formData, setFormData] = useState({
        'username': '',
        'password': ''
    });

    const [formError, setFormError] = useState({
        'username': '',
        'password': ''
    });

    const [globalErrorMessage, setErrorMessage] = useState('');
    const [globalSuccessMessage, setSuccessMessage] = useState('');
    const [isDirty, setDirty] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollection);
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

            if(users) {
                console.log(users);
            }
        }

        getUsers();
    }, []);

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
            for(const user of users) {
                if(formData['username'] === user.username && formData['password'] === user.password) {
                    handleSuccessMessage('Welcome back, ' + user.username + '!');
                    setErrorMessage('');
                    setToken(user.authToken);
                    localStorage.setItem('token', user.authToken);
                    localStorage.setItem('username', user.username);
                    setTimeout(() => { history.push('/finance') }, 1000);
                }
            }
        } else {
            setErrorMessage('Failed to log in!');
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
        const inputs = ['username', 'password'];
        const newError = {...formError};
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        setFormError(newError);
        return isInvalid;
    }

    return (
        <>
        <div className='container'>
            <div className='register-box'>
                { globalSuccessMessage ? <div className='success-message'> { globalSuccessMessage } </div> : null }
                { globalErrorMessage ? <div className='error-message'> { globalErrorMessage } </div> : null }
                <div className='logo-container'>
                    <img src="https://i.ibb.co/Jp5Sxxd/ax-digital.png" />
                </div>
                <form onSubmit={ handleSubmit }>
                    <h1>Log In</h1>
                    <p>Login on the AX-DIGITAL platform</p>
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
                        <button type='submit' disabled={ !isDirty }>Log In</button>
                    </div>
                </form>
                <p className='log-in'><Link to="/register">Create an account</Link> </p>
            </div>
        </div>
        </>
    )
}

export default Login;