import React, {useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './MenuBar.module.css';
import { useDojoPixelStore } from '@/stores/DojoPixelStore';


interface MenuBarProps {
    pixelStore: number[][];
}

const MenuBar: React.FC<MenuBarProps> = ({ pixelStore }) => {
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

    // useEffect(() => {
    //     // const bounds = [[0, 0], [10, 10]];
    //     const bounds = JSON.stringify([[0, 0], [10, 10]]);
    //     const store = useDojoPixelStore(bounds);
    //     console.log("hhhhheeeeerrrreeee");
    //     console.log(store);
    //     // setPixelStore(store);
    // }, [pixelStore]);

    const exportJson = () => {
        console.log("export a json file");
        // // pixelStore.
        // const bounds = JSON.stringify([[0, 0], [10, 10]]);
        // console.log(pixelStore.getPixel(JSON.stringify([1, 1])));
        

        // console.log(pixelStore.getPixel());
    };

    return (
        <div className={styles.inner}>
            <div className={styles.logoContainer} onClick={() => navigate('/')}>
                <img src="/assets/logo/pixeLaw-logo.png" alt="logo"/>

            </div>
            {/* <div>
                <button className={styles.menuButton} onClick={exportJson}>
                    Export a stage
                </button>
            </div> */}
            {/* <div>
                {showGovernance && <button className={styles.menuButton} onClick={() => navigate('/governance')}>Governance</button>}
                <button className={styles.menuButton} onClick={toggleSettings}>Settings</button>
            </div> */}
        </div>
    );
};

export default MenuBar;
