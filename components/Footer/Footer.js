import React from 'react';
import styles from './Footer.scss';
import { useTranslation } from 'react-i18next';

function Footer() {
    const {t} = useTranslation();
    return (
        <footer className = {styles.component}>{t('pageContentData.footer')}<p className = {styles.none}>Copyright Konrad Kostrzanowski</p></footer>
    )
};

export default Footer;