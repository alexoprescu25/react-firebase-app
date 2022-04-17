import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faXmark, 
    faCreditCard, 
    faFolderClosed, 
    faGear, 
    faUser, 
    faHouse, 
    faChartSimple,
    faCircleQuestion,
    faDumbbell 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Sidebar() {

    const closeSidebar = () => {
        document.getElementById('aside').style.left = '-100%';
    }

    return (
        <>
        <aside id='aside'>
            <div className='logo-container'>
                <Link to="/">
                    <img src="https://i.ibb.co/Jp5Sxxd/ax-digital.png" />
                </Link>
            </div>
            <Link to="#" className='close' onClick={ closeSidebar }><FontAwesomeIcon icon={faXmark} /></Link>
            <div className='sidebar-content'>
                <Link to="/"><FontAwesomeIcon icon={faHouse} />Overview</Link>
                <Link to="/"><FontAwesomeIcon icon={faChartSimple} />Analytics</Link>
                <Link to="/"><FontAwesomeIcon icon={faDumbbell} />Fitness</Link>
                <Link to="/finance"><FontAwesomeIcon icon={faCreditCard} />Finance</Link>
                <Link to="/"><FontAwesomeIcon icon={faFolderClosed} />Projects</Link>
                <Link to="/"><FontAwesomeIcon icon={faUser} />Accounts</Link>
                <Link to="/"><FontAwesomeIcon icon={faGear} />Settings</Link>
                <Link to="/"><FontAwesomeIcon icon={faCircleQuestion} />Help</Link>
            </div>
        </aside>
        </>
    )
}

export default Sidebar;