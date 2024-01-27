import React from 'react';
import styles from './Login.scss';
import { withTranslation } from 'react-i18next';

const lngs = {
    pl: { nativeName: 'Polski' },
    en: { nativeName: 'English' }
};

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
        if (e.key == 'Enter' || e.type == 'click') {
            e.preventDefault();
            let text = document.querySelector('dialog').querySelector('input');

            var mailformat = /[0-9]{6}@student.upwr.edu.pl/;
            var mailformat2 = /[a-z].[a-z]@upwr.edu.pl/;

            if (text.value.match(mailformat) || text.value.match(mailformat2)) {
                document.querySelector('dialog').setAttribute('data-login', 'true');
                document.getElementById('loginShowButton').innerHTML = 'Zalogowany';
                this.closeDialog();
            }
        }
    }

    render() {
        const { t, i18n } = this.props;
        return (
            <div className={styles.component}>
                <button id='loginShowButton' onClick={this.openDialog}>{t('pageContentData.login.buttonText')}</button>
                <i onClick={() => document.querySelector('body').classList.toggle(styles.darkMode)} className='fa-regular fa-moon darkModeButton'></i>
                <div>
                    {Object.keys(lngs).map((lng) => (
                        <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                            {lngs[lng].nativeName}
                        </button>
                    ))}
                </div>
                <dialog id='login' data-login='false'>
                    <form method='dialog'>
                        <h3>{t('pageContentData.login.header')}</h3>
                        <input onKeyDown={(e) => this.validateLogin(e)} formMethod='dialog' type='text' placeholder={t('pageContentData.login.placeholder')} />
                    </form>
                    <button id='loginButton' onClick={(e) => this.validateLogin(e)}>{t('pageContentData.login.submit')}</button>
                    <button id='closeButton' onClick={this.closeDialog}>{t('pageContentData.login.close')}</button>
                </dialog>
            </div>
        )
    }
};

export default withTranslation()(Login);