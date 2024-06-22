import React from 'react';
import styles from './App.module.css';

interface AppProps {
    icon: string; // Unicode string for the emoji
    name: string;
}

const App: React.FC<AppProps> = ({ icon, name }) => {
    return (
        <div className={styles.inner}>
            <p>{icon} {name}</p>
        </div>
    );
};

export default App;
