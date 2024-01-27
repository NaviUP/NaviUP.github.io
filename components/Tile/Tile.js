import React from 'react';
import styles from './Tile.scss';

const Tile = ({ children }) => (
    <div onClick={() => {
        document.getElementById('model').style.display = 'none';
        if (document.querySelector('canvas')) { document.querySelector('canvas').remove() };
        const tile = document.getElementById('main').firstChild;
        const mapHolder = document.getElementById('mapHolder');
        if (mapHolder.hasChildNodes()) {
            mapHolder.style.height = '0';
            mapHolder.firstChild.remove();
        }
    }} className={styles.component}>
        <div id='tile' className={styles.tile}>
            {children}
        </div>
    </div>
);

export default Tile;