import React from 'react';
import {clearIdb} from "@/webtools/utils.ts";
import styles from './Settings.module.css';

const Settings = () => {
    const handleClearIdb = async () => {
        await clearIdb();
    };

    return (
        <div className={styles.inner}>
            <h1>Settings</h1>
            <ul className={styles.settingsList}>
                <li className={styles.settingItem}>
                    <span className={styles.settingLabel}>Clear IndexedDB</span>
                    <button onClick={handleClearIdb}>Clear</button>
                </li>
                <li className={styles.settingItem}>
                    <span className={styles.settingLabel}>Example Setting</span>
                    <input type="text" className={styles.settingInput}/>
                </li>
            </ul>
        </div>
    );
};

export default Settings;
