import React from 'react';
import styles from './Login.scss';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


class Login extends React.Component {
    openDialog = () => {
        const login = document.getElementById('login');
        login.showModal();
    }

    closeDialog = () => {
        const login = document.getElementById('login');
        login.close();
    }

    validateLogin = e => {
        console.log(e.type)
        if(e.key == 'Enter' || e.type == 'click'){
            e.preventDefault();
            let text = document.querySelector('dialog').querySelector('input');

            var mailformat = /[0-9]{6}@student.upwr.edu.pl/;
            var mailformat2 = /[a-z].[a-z]@upwr.edu.pl/;
            var zut = /ZUT2023/;
            
            if(text.value.match(mailformat) || text.value.match(mailformat2) || text.value.match(zut)){
                document.querySelector('dialog').setAttribute('data-login', 'true');
                document.getElementById('loginShowButton').innerHTML = 'Zalogowany';
                this.closeDialog();
            }
        }
        
    }

    render() {
        return (
            <div className = {styles.component}>
                <button id='loginShowButton' onClick={this.openDialog}>
                    Zaloguj się
                </button>
                <i onClick={() => document.querySelector('body').classList.toggle(styles.darkMode)} className = 'fa-regular fa-moon darkModeButton'></i>
                <dialog id='login' data-login='false'>
                    <form method='dialog'>
                        <h3>Potwierdź że jesteś z UPWR</h3>
                        <input onKeyDown={(e) => this.validateLogin(e)} formMethod='dialog' type='text' placeholder='Podaj mail uczelniany' />
                    </form>
                    <button id='loginButton' onClick={(e) => this.validateLogin(e)}>Wprowadź</button>
                    <button id='closeButton' onClick={this.closeDialog}>Zamknij</button>
                </dialog>
            </div>
        )
    }
};


Login.propTypes = {
    text: PropTypes.string,
};

export default Login;