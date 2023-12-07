import React from 'react';
import styles from './Footer.scss';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const Footer = props => (
    <footer className = {styles.component}>{ReactHtmlParser(props.title)}<p className = {styles.none}>Copyright Konrad Kostrzanowski</p></footer>
)

Footer.propTypes = {
    title: PropTypes.string,
};

export default Footer;