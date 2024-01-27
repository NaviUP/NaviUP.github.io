import React from 'react';
import styles from './Flip.scss';
import { useTranslation } from 'react-i18next';

function Flip() {
    const {t} = useTranslation();

    return (
        <div className={styles.component}>
            <h3>{t('flipData.text')}</h3>
            <img src={t('flipData.img')} />
        </div>
    )
};

export default Flip;