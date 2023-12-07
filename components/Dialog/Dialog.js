import React from 'react';
import styles from './Dialog.scss';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const Dialog = () => (
    <dialog id='login' className = {styles.component}>
        <form method='dialog'>
            <h3></h3>
            <input formMethod='dialog' type='text' placeholder='Podaj mail uczelniany' />
        </form>
        <button id='loginButton'>Wprowadź</button>
        <button id='closeButton' onClick={login.close()}>Zamknij</button>
    </dialog>
);

Dialog.propTypes = {
    text: PropTypes.string,
};

export default Dialog;