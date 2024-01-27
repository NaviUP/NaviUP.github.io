import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.scss';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

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

    render() {
        const { t } = this.props;
        return (
            <div onClick={() => {
                document.getElementById('model').style.display = 'none';
                if (document.querySelector('canvas')) { document.querySelector('canvas').remove() };
                const tile = document.getElementById('main').firstChild;
                const mapHolder = document.getElementById('mapHolder');
                if (mapHolder.hasChildNodes()) {
                    mapHolder.style.height = '0';
                    mapHolder.firstChild.remove();
                }
            }}
                className={[styles.links, styles.hidden].join(' ')}>
                <ul>
                    {this.state.links.map(({ key, href }) => (
                        <NavLink exact key={key} to={href} activeClassName='active'>
                            <li>{t('pageContentData.menu.' + key + '.text')}<p></p></li>
                        </NavLink>
                    ))}
                </ul>
                <img id='arrow' src='src/images/strzałka.png' onClick={this.hider} />
            </div>
        )
    }
};

Menu.propTypes = {
    link: PropTypes.array,
};

export default withTranslation()(Menu);