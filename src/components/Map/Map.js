import React from 'react';
import styles from './Map.scss';
import * as L from 'leaflet';

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

        if(this.state.removedAdded == false){
            this.setState({removedAdded: true});
            const tile = document.getElementById('main').firstChild;

            tile.addEventListener('click', () => {
                if(mapHolder.hasChildNodes()) {
                    mapHolder.classList = [styles.mapContainer, styles.noDimensions].join(' ');
                    mapHolder.firstChild.remove();
                }
            });
        }

        const badNames = ['C2', 'C3', 'C5']

        let id = hash.split('-');
        let newHash = id[0].split('%20')[0] + '-' + id[1].split('%20')[0];

        if(id[0].split('%20')[0] == id[1].split('%20')[0]){
            let b = document.createElement('dialog');
            b.innerHTML = "<h1>Szukanie drogi do budynku w którym się już znajdujesz nie jest zbyt inteligentne ༼ つ ◕_◕ ༽つ</h1>";
            mapHolder.appendChild(b);

            b.showModal();

            setTimeout(() => {
                b.close();
                b.remove();
            }, 2000);

            return
        }

        if(badNames.includes(id[0].split('%20')[0]) && badNames.includes(id[1].split('%20')[0])){
            let b = document.createElement('dialog');
            b.innerHTML = "<h1>Budunki są ze sobą połączone.<br>Spróbuj poszukać w Pomieszczeniach<br>ヾ(•ω•`)o</h1>";
            mapHolder.appendChild(b);

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

        }, 150);
    }

    render() {
        return (
            <div id='mapHolder' className={[styles.mapContainer, styles.noDimensions].join(' ')} onClick={() => this.takeHash()}>
            </div>
        )
    }
}

export default Map;