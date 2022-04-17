import React, { useEffect } from 'react';
import '../style/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCheck,
	faChartPie,
	faChartSimple,
	faGear,
	faUser,
	faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Homepage() {

	useEffect(() => {
        document.querySelector('body').setAttribute('id', 'Homepage');
    }, []);

	return (
		<>
			<div className='homepage-content'>
				<div className='container'>
					<div className='features'>
						<p>Services:</p>
						<ul>
							<li>
								<FontAwesomeIcon icon={faCheck} />
								<p>Budget Tracker &#38; Planner</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCheck} />
								<p>Search Engine Optimization</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCheck} />
								<p>PDF Reports</p>
							</li>
						</ul>
					</div>
					<div className='homepage-services'>
						<div>
							<Link to="/finance">
								<FontAwesomeIcon icon={faChartPie} />
								<p>Finance</p>
							</Link>					
						</div>
						<div>
							<Link to="/analytics">
								<FontAwesomeIcon icon={faChartSimple} />
								<p>Analytics</p>
							</Link>					
						</div>
						<div>
							<Link to="/settings">
								<FontAwesomeIcon icon={faGear} />
								<p>Settings</p>
							</Link>					
						</div>
						<div>
							<Link to="/account">
								<FontAwesomeIcon icon={faUser} />
								<p>Account</p>
							</Link>					
						</div>
						<div>
							<Link to="/seo">
								<FontAwesomeIcon icon={faMagnifyingGlass} />
								<p>SEO</p>
							</Link>					
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Homepage;