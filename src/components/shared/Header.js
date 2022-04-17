import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../auth/AuthContext';

function Header() {

    function showSidebar() {
        document.getElementById('aside').style.left = "0";
    }

    const { token, setToken } = useContext(AuthContext);
    const [username, setUsername] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username');
        if(username) {
            setUsername(username);
            console.log(username);
        }
    }, [username]);

    function handleLogout(e) {
        e.preventDefault();

        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
    }

    return (
        <>
        <Sidebar />
        <header>
            <div className='container'>
                <div className='logo-container'>
                    <Link to="/">
                        <img src="https://i.ibb.co/Jp5Sxxd/ax-digital.png" />
                    </Link>
                </div>
                <nav>
                    <div>
                        { token ? 
                            <Link to="#" onClick={ showSidebar }><FontAwesomeIcon icon={faBars} /></Link> : null
                        }                  
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className='authentication'>
                        { token ? 
                            <div className='auth-user'>
                                { username ? <p className='username'> Welcome, { username }! </p> : null }
                                
                                <div 
                                    className='profile-image' 
                                    onMouseEnter={ (e) => setOpen(true) }
                                >
                                    <img 
                                        src='https://i.ibb.co/vvJtH0D/blank-profile-picture-973460-640.png'
                                        />
                                </div> 
                                { open ? 
                                <div className='profile-dropdown' onMouseLeave={ (e) =>setOpen(false) }>
                                    <Link to="#" onClick={ handleLogout }><FontAwesomeIcon icon={faArrowRightFromBracket} />Logout</Link>
                                </div> : null }
                                
                            </div> :
                            <div>
                                <Link to="/register">Register</Link>
                                <Link to="/login">Login</Link>
                            </div>
                        }                
                    </div>
                </nav>
            </div>
        </header>
        </>
    )
}

export default Header;