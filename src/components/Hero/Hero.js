import React from 'react';
import styles from './Hero.scss';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import MediaQuery from 'react-responsive';

class Hero extends React.Component {
    state = {
        links: this.props.links || [],
    }
    render() {
        return (
            <header className = {styles.component}>
                <a href = {this.props.skn[0].href} target="_blank">
                    <img className = {styles.skn} src = {this.props.skn[0].image} />
                    <h1>{ReactHtmlParser(this.props.skn[0].shortcut)}</h1>
                    <div>
                        <p>{ReactHtmlParser(this.props.skn[0].p1)}</p>
                        <p>{ReactHtmlParser(this.props.skn[0].p2)}</p>
                    </div>
                
                </a>
                <img className = {styles.logo} src="src/images/NAVIUP PNG.png" />
                <div>
                    {/* {this.state.links.map(({key, href, ...linksProps}) => (
                        <a key = {key} href = {href} target='_blank'>
                            <img {...linksProps.image[0]} />
                        </a>
                    ))} */}
                    <a href = {this.state.links[0].href} target='_blank'>
                        <img src = {this.state.links[0].image.src} className = {this.state.links[0].image.className} />
                    </a>
                    <a href = {this.state.links[1].href} target='_blank'>
                        <MediaQuery minWidth={1001}>
                            <img src = {this.state.links[1].image.src} className = {this.state.links[1].image.className} />
                        </MediaQuery>
                        <MediaQuery maxWidth={1000}>
                            <img src = {this.state.links[1].image.srcSmall} className = {this.state.links[1].image.className} />
                        </MediaQuery>
                    </a>
                </div>
            </header>
        )
    }
};

Hero.propTypes = {
    skn: PropTypes.array,
    image: PropTypes.array,
};

export default Hero;