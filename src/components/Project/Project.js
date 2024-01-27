import React from "react";
import styles from './Project.scss';
import Tile from "../Tile/Tile";
import { useTranslation } from "react-i18next";

function Project() {
    const { t } = useTranslation();
    return (
        <Tile>
            <div className={styles.component}>
                <h1>{t('projectData.title')}</h1>
                <h4>{t('projectData.paragraphs.h4')}</h4>
                <p>{t('projectData.paragraphs.p1')}</p>
                <p>{t('projectData.paragraphs.p2')}</p>
                <p>{t('projectData.paragraphs.p3')}</p>
                <div>
                    <a href={t('projectData.konkursLink')} target="_blank">{t('projectData.konkursText')}</a>
                    <i className="fa-solid fa-sack-dollar"></i>
                </div>
                <div>
                    <img src={t('projectData.image')} alt="logo upwr" />
                </div>
            </div>
        </Tile>
    )
}

export default Project;