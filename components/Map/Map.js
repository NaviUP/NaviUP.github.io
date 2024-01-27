import React from 'react';
import styles from './Map.scss';
import * as L from 'leaflet';
import { Trans } from 'react-i18next';
import { render } from 'react-dom';

class Map extends React.Component {
    state = {
        removedAdded: false,
    }

    takeHash = () => {
        let id = window.location.hash.replace(/[A-Z]\*/).replace('#', '');

        if (id.search('-') > 0) {
            this.createMap(id);
        }
    }

    createMap = (hash = '') => {
        const mapHolder = document.getElementById('mapHolder');
        let a;

        if (mapHolder.hasChildNodes()) {
            return
        }

        // if(this.state.removedAdded == false){
        //     this.setState({removedAdded: true});
        //     const tile = document.getElementById('main').firstChild;

        //     tile.addEventListener('click', () => {
        //         if(mapHolder.hasChildNodes()) {
        //             mapHolder.classList = [styles.mapContainer, styles.noDimensions].join(' ');
        //             mapHolder.firstChild.remove();
        //         }
        //     });
        // }
        mapHolder.style.height = '100vh';
        const badNames = ['C2', 'C3', 'C5']

        let id = hash.split('-');
        let newHash = id[0].split('%20')[0] + '-' + id[1].split('%20')[0];

        if(id[0].split('%20')[0] == id[1].split('%20')[0]){
            let b = document.createElement('dialog');
            document.getElementById('mapHolder').appendChild(b);

            render(<Trans i18nKey='funnyTexts.buildingSame' />, b);

            b.showModal();

            setTimeout(() => {
                b.close();
                b.remove();
            }, 2000);

            return
        }

        if(badNames.includes(id[0].split('%20')[0]) && badNames.includes(id[1].split('%20')[0])){
            let b = document.createElement('dialog');
            document.getElementById('mapHolder').appendChild(b);

            render(<Trans i18nKey='funnyTexts.buildingConnected' />, b);

            b.showModal();

            setTimeout(() => {
                b.close();
                b.remove();
            }, 2000);

            return
        }

        a = document.createElement('div');
        a.setAttribute('id', 'map');

        if (mapHolder.classList == [styles.mapContainer, styles.noDimensions].join(' ') && hash != '') {
            mapHolder.classList = styles.mapContainer;
        } else if (mapHolder.classList == styles.mapContainer && hash == '') {
            mapHolder.classList = [styles.mapContainer, styles.noDimensions].join(' ');
        }

        
        mapHolder.appendChild(a);

        let points = [];
        let data = [];

        fetch('src/data/buildings.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse['paths'])});

        setTimeout(() => {
            console.log(data[0])
            data[0].forEach(el => {
                if(Object.keys(el)[0] == newHash){
                    points.push(el[newHash]);
                }
            });

            if(points.length == 0){
                newHash = id[1].split('%20')[0] + '-' + id[0].split('%20')[0];
                
                data[0].forEach(el => {
                    if(Object.keys(el)[0] == newHash){
                        points.push(el[newHash]);
                    }
                });
            }

            var mymap = L.map('map').setView(points[0][0], 16);
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mymap);
    
            var polyline = L.polyline(points[0], { color: 'blue', smoothFactor: 1.5 }).addTo(mymap);

        }, 1000);
    }

    render() {
        return (
            <div id='mapHolder' className={[styles.mapContainer, styles.noDimensions].join(' ')} onClick={() => this.takeHash()}>
            </div>
        )
    }
}

export default Map;