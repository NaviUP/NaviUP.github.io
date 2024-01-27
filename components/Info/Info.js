import React from "react";
import styles from './Info.scss';
import { useTranslation } from "react-i18next";

function Info(props) {
    const { t } = useTranslation();
    return (
        <div className={styles.component}>
            <h3>{t('infoData.title')}</h3>
            <h4>{props.title}</h4>
            <h3>{t('infoData.email')}</h3>
            <h4>{props.email}</h4>
            <h3>{t('infoData.institute')}</h3>
            <h4>{props.institute}</h4>
        </div>
    )
}

export default Info;