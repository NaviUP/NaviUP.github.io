import React from 'react';
import styles from './Flip.scss';
import { flipData } from '../../data/dataStore';

const Flip = () => (
    <div className = {styles.component}>
        <h3>{flipData.text}</h3>
        <img src = {flipData.img} />
    </div>
)

export default Flip;