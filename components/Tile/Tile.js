import React from 'react';
import styles from './Tile.scss';

const Tile = ({children}) => (
    <div onClick={() => {document.getElementById('model').style.display = 'none'; if(document.querySelector('canvas')){document.querySelector('canvas').remove()}}} className = {styles.component}>
        <div id = 'tile' className = {styles.tile}>
            {children}
        </div>
    </div>
);

export default Tile;