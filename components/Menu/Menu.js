import React, { useRef } from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Menu.scss';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

class Menu extends React.Component {
    state = {
        links: this.props.links || [],
    }

    hider = () => {
        const arrow = document.getElementById('arrow');
        const linksDom = arrow.parentElement;

        arrow.classList.toggle(styles.turn);
        linksDom.classList.toggle(styles.hidden);
    }

    animate = () => {
        
        const arrow = document.getElementById('arrow').getAnimations()[0];
        setInterval ( () => {arrow.play()}, 6000);
    }

    render() {
        return (
            <div onClick={() => {document.getElementById('model').style.display = 'none'; if(document.querySelector('canvas')){document.querySelector('canvas').remove()}}} className = {[styles.links, styles.hidden].join(' ')}>
                <ul>
                    {this.state.links.map(({key, href, text}) => (
                        <NavLink exact key = {key} to = {href} activeClassName = 'active'>
                            <li>{ReactHtmlParser(text)}<p></p></li>
                        </NavLink>
                    ))}
                </ul>
                <img id = 'arrow' src = 'src/images/strzałka.png' onClick = {this.hider} onLoad={this.animate} />
            </div>
        )
    }
};

Menu.propTypes = {
    link: PropTypes.array,
};

export default Menu;