import React from 'react';
import './styles/normalize.scss';
import './styles/global.scss';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { HashRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter basename='/'>
            <App />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('app')
);