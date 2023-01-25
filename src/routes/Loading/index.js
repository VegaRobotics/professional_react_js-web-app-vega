/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './styles.css';

const Loading = () => {
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 20000);

    return (
        <div className={`loading-splash ${isLoading ? 'active' : ''}`}>
            <div className="loading-animation"></div>
            <h1 className="loading-text"> Carregando...</h1>
        </div>
    );
}

export default Loading;
