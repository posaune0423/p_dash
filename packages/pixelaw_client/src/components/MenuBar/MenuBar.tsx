import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './MenuBar.module.css';

const MenuBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if the settings page is shown based on the current path
    const showSettings = location.pathname === '/settings';
    const showGovernance = location.pathname !== '/governance';

    const toggleSettings = () => {
        if (showSettings) {
            navigate(-1); // Go back if we're currently showing settings
        } else {
            navigate('/settings'); // Navigate to settings if not currently showing
        }
    };

    return (
        <div className={styles.inner}>
            <div className={styles.logoContainer} onClick={() => navigate('/')}>
                <img src="/assets/logo/pixeLaw-logo.png" alt="logo"/>

            </div>
            {/* <div>
                {showGovernance && <button className={styles.menuButton} onClick={() => navigate('/governance')}>Governance</button>}
                <button className={styles.menuButton} onClick={toggleSettings}>Settings</button>
            </div> */}
        </div>
    );
};

export default MenuBar;
