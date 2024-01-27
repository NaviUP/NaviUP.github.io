import React from "react";
import styles from './About.scss';
import Tile from "../Tile/Tile";
import { aboutData } from "../../data/dataStore";
import { withTranslation } from "react-i18next";

class About extends React.Component {
    state ={
        loaded: false,
        data: aboutData,
    }

    teams = () => {
        if(this.state.loaded){
            return;
        }

        const wrapper = document.querySelector('.' + styles.aboutFlex);

        if(!wrapper){
            return;
        }

        const mask = wrapper.querySelector('#mask');
        const image = wrapper.querySelector('#aboutImg');

        for(let box of wrapper.childNodes){
            if(box.innerHTML && box.getAttribute('id') != null && box.getAttribute('id').replace('About_', '').replace(/_.{5}/, '') != 'help'){
                let newMask = box.getAttribute('id').replace('About_', '').replace(/_.{5}/, '');

                box.addEventListener('mouseover', () => {
                    mask.setAttribute('src', 'src/images/masks/' + newMask + '.png');

                    mask.classList.toggle(styles.visible);
                    image.classList.toggle(styles.gray);
                });

                box.addEventListener('mouseout', () => {
                    mask.classList.toggle(styles.visible);
                    image.classList.toggle(styles.gray);
                });
            }
        }

        this.setState({loaded: true});
    }

    render() {
        const { t } = this.props;
        return (
            <Tile>
                <div onLoad = {this.teams} className = {styles.component} style={{maxHeight: '2000px'}}>
                <h1>{t('aboutData.title')}</h1> 
                <p>{t('aboutData.paragraphs.p1')}</p> 
                <p>{t('aboutData.paragraphs.p2')}</p> 
                <p>{t('aboutData.paragraphs.p3')}</p> 
                <div className = {styles.aboutFlex}>
                    {this.state.data.firstBlocks.map(({key, id}) => (
                        <div key={key} id = {styles[id]}>
                            <p><b>{t('aboutData.firstBlocks.'+ key + '.groupName')}</b></p>
                            {this.state.data.firstBlocks[key].people.map(({key, name}) => (
                                <p key={key}>{name}</p>
                            ))}
                        </div>
                    ))}
                    <div id="images">
                        <img id="mask" src="" />
                        <img id="aboutImg" src = {this.state.data.imfSource} />
                    </div>
                    {this.state.data.secondBlocks.map(({key, id}) => (
                        <div key={key} id = {styles[id]}>
                            <p><b>{t('aboutData.secondBlocks.'+ key + '.groupName')}</b></p>
                            {this.state.data.secondBlocks[key].people.map(({key, name}) => (
                                <p key={key}>{name}</p>
                            ))}
                        </div>
                    ))}
                </div>
                <embed hidden = {true} />
                    <audio loop autoPlay src = {this.state.data.music} type="audio/mpeg"></audio>
                </div>
            </Tile>
        );
    };
};

export default withTranslation()(About);