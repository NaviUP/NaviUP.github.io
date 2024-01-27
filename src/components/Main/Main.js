import React from "react";
import styles from './Main.scss';
import Tile from "../Tile/Tile";
import Info from "../Info/Info";
import { withTranslation } from "react-i18next";
import { render } from "react-dom";

class Main extends React.Component {
    state = {
        from: [],
        fromButton: '',
        to: [],
        toButton: '',
        clicked: false,
        idStart: 0,
        idEnd: 0,
        currentFocus: 0,
        buildingList: [],
        buildingFrom: '',
        buildingTo: '',
        floorStart: 0,
        floorEnd: 0
    }

    autocomplete = where => {
        let startId, endId;
        
        let inp = document.getElementById(where);

        var a, b, i, value = inp.value;
        let arr;

        let buttonName = ''

        if(where == 'start'){
            arr = this.state.from[0];
            buttonName = this.state.fromButton;
        }else {
            arr = this.state.to[0];
            buttonName = this.state.toButton;
        }

        closeAllLists();
        
        if(!value) { return false;}

        a = document.createElement('DIV');
        a.setAttribute('id', inp.id + 'autocomplete-list');
        a.setAttribute('class', styles.autocompleteItems);

        inp.parentNode.appendChild(a);

        if(value == 'Bob'){
            if(inp.id == 'start'){
                this.setState({idStart: 78});
                // placeInfo(inp, idStart, arr);
                if(inp.value != ''){
                    // howManyChosens(true);
                }
            } else{
                this.setState({idEnd: 78});
                // placeInfo(inp, idEnd, arr);
                //buttons[0].click();
            }
            closeAllLists();
            // wrapperVisibility(true, inp.getAttribute('id'));
            // resizeMe.call(inp);
        }

        if(value == "It's him"){
            if(inp.id == 'start'){
                this.setState({idStart: 999});
                // placeInfo(inp, idStart, arr);
                if(inp.value != ''){
                    // howManyChosens(true);
                }
            } else{
                this.setState({idEnd: 999});
                // placeInfo(inp, idEnd, arr);
                //buttons[0].click();
            }
            closeAllLists();
            // wrapperVisibility(true, inp.getAttribute('id'));
            // resizeMe.call(inp);
        }

        for(i = 0; i < arr.length; i++){
            let names = '';
            
            if(buttonName == 'buildings' || buttonName == 'buildingsPathing'){
                names = Object.keys(arr[i])[0];
            }else {
                names = arr[i]['name'];
            }

            if(names.substr(0, value.length).toUpperCase() == value.toUpperCase()){
                b = document.createElement('DIV');
                b.setAttribute('id', arr[i]['id']);
                b.setAttribute('data-floor', arr[i]['level'])
                
                b.innerHTML = '<a><strong>' + names.substr(0, value.length) + 
                '</strong>'+ names.substr(value.length) + '<input type="hidden" value="' + names + '"></a>';

                const self = this;
                b.addEventListener('click', function(event){
                    inp.value = this.getElementsByTagName('input')[0].value;
                    
                    if(inp.id == 'start'){
                        startId = this.id;
                        self.setState({idStart: startId});
                        self.setState({floorStart: this.getAttribute('data-floor')});
                        //setNewState();
                        // placeInfo(inp, startId, arr);
                    } else{
                        endId = this.id;
                        self.setState({idEnd: endId});
                        self.setState({floorEnd: this.getAttribute('data-floor')});
                        //setNewState();
                        // placeInfo(inp, endId, arr);
                        //buttons[0].click();
                    }
                    /*console.log(idStart);
                    console.log(idEnd);
                    console.log(inp.getAttribute('id'));*/
                    for(let i = 0; i < arr.length; i++){
                        if(arr[i]['description'] && arr[i]['name'] == inp.value){
                            const info = document.querySelector('[data-info=' + inp.id + ']');
                            info.firstElementChild.classList.remove(styles.nonVisible);
                            
                            if(info.children.length > 1){
                                info.lastChild.remove();
                            }

                            let z = document.createElement('div');
                            z.setAttribute('class', styles.nonVisible);
                            info.appendChild(z);
                
                            render(<Info title={arr[i]['description']['title']} email={arr[i]['description']['email']} institute={arr[i]['description']['institute']} />, z);
                            return
                        }
                    }

                    closeAllLists();
                    // wrapperVisibility(true, inp.getAttribute('id'));
                    // resizeMe.call(inp);
                });
                this.setState({currentFocus: 0});
                a.appendChild(b);
            }
        }
        
        function closeAllLists(elements){
            var x = document.getElementsByClassName(styles.autocompleteItems);
            
            for(let i = 0; i < x.length; i++){
                if(elements) {
                    if(elements != x[i] && elements != inp && elements.parentElement.className != styles.buildingChooser){
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
        }

        document.addEventListener('click', function(event){
            closeAllLists(event.target);
        });
    }

    chooseBuilding = (where, place) => {
        let inp = document.querySelector('[data-begining=' + place + ']');
        var a, b;
        let arr;
        
        if(inp.querySelector('[id="autocomplete-list"]')){
            inp.querySelector('[id="autocomplete-list"]').remove();
            console.log('work work')
        }
        
        if(where == 'start'){
            arr = this.state.buildingList[0];
        }else {
            arr = this.state.buildingList[0];
        }

        a = document.createElement('div');
        a.setAttribute('id', inp.id + 'autocomplete-list');
        a.setAttribute('class', styles.autocompleteItems);

        inp.appendChild(a);

        b = document.createElement('div');
        a.appendChild(b);

        for(let i = 0; i < arr.length; i++){
            let newPlace =  document.createElement('div');
            newPlace.innerHTML = Object.keys(arr[i])[0];

            newPlace.addEventListener('click', (e) => {
                // b.style.width = newPlace.innerHTML.length + 'ch';
                e.stopPropagation();

                if(inp.getAttribute('data-begining') == 'from'){
                    this.setState({from: [arr[i][newPlace.innerHTML]]});
                    this.setState({fromButton: 'rooms'});
                    this.setState({buildingFrom: newPlace.innerHTML});
                    // idStart = Object.keys(arr[i])[0]['id'];
                }else{
                    this.setState({to: [arr[i][newPlace.innerHTML]]});
                    this.setState({toButton: 'rooms'});
                    this.setState({buildingTo: newPlace.innerHTML});
                    // idEnd = Object.keys(arr[i])[0]['id'];
                }

                inp.querySelector('p').innerHTML = newPlace.innerHTML;

                setTimeout(() => {
                    document.getElementById('autocomplete-list').remove();
                }, 0);
                    
            });
            b.appendChild(newPlace);
        }
    }

    addLogic = where => {
        const buildingListContainer = document.querySelector("[data-begining=" + where + "]");
        let a, b;

        if(buildingListContainer.childElementCount > 0){
            buildingListContainer.innerHTML = '';
        }

        setTimeout(() => {           
            a = document.createElement('DIV');
            a.className = styles.buildingChooser;
            
            b = document.createElement('p');
            b.innerHTML = 'W jakim budynku?';
            
            a.appendChild(b)
            
            buildingListContainer.appendChild(a);
            
            a.addEventListener('click', () => {
                this.chooseBuilding('start', where);
            })
        }, 10);

    }

    focus = place => {
        const input = document.getElementById(place);
        input.focus();
        input.select();
    }

    manualSearch = (id, e) => {
        var x = document.getElementById(id + 'autocomplete-list');
        if(!x) {return false}

        let focus = this.state.currentFocus, value = x.parentElement.firstChild.value;

        if(x) {x = x.getElementsByTagName('div');}
        if(!value) { return false}

        if(e.key == 'ArrowUp'){
            focus--;

            if(focus < 0) {focus = 0}
            this.setState({currentFocus: focus});
            addActive(x);
        } else if(e.key == "ArrowDown"){
            focus++;

            if(focus >= x.length) {focus = x.length-1}
            this.setState({currentFocus: focus});
            addActive(x);
        } else if(e.key == 'Enter'){
            e.preventDefault();

            if(focus > -1){
                if (x) {x[focus].click();}
            }
            this.setState({currentFocus: 0});
        }

        function addActive(x){
            if(!x) {return false;}
            
            removeActive(x);
            
            x[focus].scrollIntoView({behavior: 'smooth', block: 'center'});
            x[focus].firstChild.classList.add(styles.autocompleteActive);
        }

        function removeActive(x){
            for(let i = 0; i < x.length; i++){
                x[i].firstChild.classList.remove(styles.autocompleteActive);
            }
        }
    }

    setNewState = () => {
        this.setState({idStart: 25});
    }

    show = (type, where) => {
        const chooseButtons = document.querySelectorAll('.' + styles.chooseButton);
        const inputs = document.querySelectorAll('[data-data=""]');
        
        for(let i = 0; i < chooseButtons.length; i++){
            const currentButton = chooseButtons[i];

            if(currentButton.getAttribute('data-place') == where && currentButton.getAttribute('data-data') == type){
                currentButton.classList.add(styles.chosen);
            }else if(currentButton.getAttribute('data-place') == where && currentButton.getAttribute('data-data') != type){
                currentButton.classList.remove(styles.chosen);
            }
        }

        if(chooseButtons[2].classList.contains(styles.chosen)){
            // data = []
            // fetch('src/data/B&R.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse[type])})
            // console.log(data)
            // this.setState({from: data});
            chooseButtons[3].classList.add(styles.nonVisible);
            chooseButtons[4].classList.add(styles.nonVisible);

            chooseButtons[5].classList.remove(styles.nonVisible);
        }else {
            chooseButtons[3].classList.remove(styles.nonVisible);
            chooseButtons[4].classList.remove(styles.nonVisible);
            
            chooseButtons[5].classList.add(styles.nonVisible);
            chooseButtons[5].classList.remove(styles.chosen);
        }

        if(type == 'buildings' || type == 'buildingsPathing'){
            inputs.forEach(el => {
                if(el.querySelector('[id="start"]') && where == 'from'){
                    el.className = [el.className, styles.nonVisible].join(' ');
                }else if(el.querySelector('[id="end"]') && where == 'to'){
                    el.className = [el.className, styles.nonVisible].join(' ');
                }
            });
        }else {
            inputs.forEach(el => {
                if(el.querySelector('[id="start"]') && where == 'from'){
                    el.className = styles.autoComplete;
                }else if(el.querySelector('[id="end"]') && where == 'to'){
                    el.className = styles.autoComplete;
                }
            });

            if(type == 'people'){
                inputs.forEach(el => {
                    if(el.querySelector('[id="start"]') && where == 'from' && el.parentElement.firstChild.hasChildNodes()){
                        el.parentElement.firstChild.firstChild.remove();
                    }else if(el.querySelector('[id="end"]') && where == 'to' && el.parentElement.firstChild.hasChildNodes()){
                        el.parentElement.firstChild.firstChild.remove();
                    }
                });
            }
        }

        // console.log(input.parentElement.parentElement.firstChild.hasChildNodes())
        // if(input.parentElement.parentElement.firstChild.hasChildNodes()){
        //     input.parentElement.parentElement.firstChild.firstChild.remove();
        //     console.log('work work')
        // }

        let data = [];
        const logged = document.querySelector('dialog').getAttribute('data-login');
        
        let whatToFetch = ''

        if(type == 'people'){
            whatToFetch = 'people';
        }else if(type == 'buildingsPathing'){
            whatToFetch = 'B&R';
        }else {
            whatToFetch = 'B&R';
            type = 'buildings';
        }
        
        fetch('src/data/' + whatToFetch + '.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse[type])});
        
        // if(logged == 'false'){
        //     fetch('src/data/B&R.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse[type])});
        // }else {
        //     fetch('src/data/app2.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse[type])});
        // }
        
        // where == 'from' ? this.setState({from: data}) && this.setState({fromButton: type}) : this.setState({to: data}) && this.setState({toButton: type});

        if(where == 'from'){
            this.setState({idStart: ''});
            this.setState({from: data});
            this.setState({fromButton: type});
        }else {
            this.setState({idEnd: ''});
            this.setState({to: data});
            this.setState({toButton: type});
        }
        
        if(type == 'buildings' || type == 'buildingsPathing'){
            this.setState({buildingList: data});
        }

    }

    showModel = () => {
        setTimeout(() => {
            if(this.state.idStart != ''){
                const model = document.getElementById('model');
                const modelHolder = document.getElementById('showModel');
                model.setAttribute('data-start', this.state.floorStart);
                model.setAttribute('data-end', this.state.floorEnd);
                modelHolder.click();
            }else {
                const map = document.getElementById('mapHolder');
                map.click();
            }
            
        }, 100);
    }

    generateLink = () => {
        let link = '';
        if(this.state.idStart != ''){
            link = this.state.idStart + '_' + this.state.idEnd;
            window.location.hash = link;
        }else {
            link = this.state.buildingFrom + '-' + this.state.buildingTo;
            window.location.hash = link;
        }

        return link;
    }
    
    count = (disable = false) => {
        const tileHeight = document.getElementById('main');
        const howMany = document.querySelectorAll('.' + styles.chosen);
        const inputs = document.querySelectorAll('input');
        const buildings = document.querySelectorAll('[data-begining]');
        const infos = document.querySelectorAll('[data-info]');

        if(howMany.length > 0){
            tileHeight.style.overflow = 'initial';
            tileHeight.setAttribute('data-height', 'long');
        }

        if(disable){
            tileHeight.setAttribute('data-height', '');
            tileHeight.style.overflow = 'hidden';
            
            howMany.forEach(el => {
                el.classList.remove(styles.chosen);
            });

            inputs.forEach(element => {
                element.value = '';
            });

            buildings.forEach(el => {
                let building = el.firstChild;

                if(building){
                    el.removeChild(building)
                }
            });

            infos.forEach(el => {
                if(el.children.length > 1) {
                    el.firstElementChild.classList.add(styles.nonVisible);
                    el.lastChild.remove();
                }
            })
        }
    }

    render() {
        const { t } = this.props;
        return (
            <Tile>
                <div id = 'main' className = {styles.component} data-height = ''>
                    <div className = {styles.where}>
                        <div className = {styles.info} data-info = 'start'>
                            <i className = {["fa fa-question", styles.infoIcon, styles.nonVisible].join(' ')} onClick={() => {if(document.querySelector('[data-info=start] > div')){document.querySelector('[data-info=start] > div').classList.toggle(styles.nonVisible)}}} />
                        </div>
                        <h1>{t('mainData.whereAreYou')}</h1>
                        <a onClick={() => {this.show('people', 'from'); this.count()}} className = {styles.chooseButton} data-place='from' data-data="people">{t('mainData.person1')}</a>
                        <a onClick={() => {this.show('rooms', 'from'); this.count(); this.addLogic('from')}} className = {styles.chooseButton} data-place='from' data-data="rooms">{t('mainData.room1')}</a>
                        <a onClick={() => {this.show('buildingsPathing', 'from'); this.count(); this.addLogic('from')}} className = {styles.chooseButton} data-place='from' data-data="buildingsPathing">{t('mainData.building1')}</a>
                        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                            <div className = {[styles.autocomplete, styles.buildingChooserContainer].join(' ')} data-begining="from">                           
                            </div>
                            <div className = {styles.autocomplete} data-data="">
                                <input onKeyDown={e => this.manualSearch('start', e)} onClick={() => this.focus('start')} onInput = {() => this.autocomplete('start')} type="text" placeholder={t('mainData.description1')} name="search" id="start" className = {styles.searchBox} />                           
                            </div>
                        </form>
                    </div>
                    <div id="search" className = {[styles.search].join(' ')}>
                        <div className = {styles.info} data-info = 'end'>
                            <i className = {["fa fa-question", styles.infoIcon, styles.nonVisible].join(' ')} onClick={() => {if(document.querySelector('[data-info=end] > div')){document.querySelector('[data-info=end] > div').classList.toggle(styles.nonVisible)}}} />
                        </div>
                        <h2>{t('mainData.whereAreYouGoing')}</h2>
                        <a onClick={() => {this.show('people', 'to'); this.count()}} className = {styles.chooseButton} data-place='to' data-data="people">{t('mainData.person2')}</a>
                        <a onClick={() => {this.show('rooms', 'to'); this.count(); this.addLogic('to')}} className = {styles.chooseButton} data-place='to' data-data="rooms">{t('mainData.room2')}</a>
                        <a onClick={() => {this.show('buildingsPathing', 'to'); this.count(); this.addLogic('to')}} className = {styles.chooseButton} data-place='to' data-data="buildingsPathing">{t('mainData.building2')}</a>
                        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                            <div className = {[styles.autocomplete, styles.buildingChooserContainer].join(' ')} data-begining="to">                           
                            </div>
                            <div className = {styles.autocomplete} data-data="">
                                <input onKeyDown={e => this.manualSearch('end', e)} onClick={() => this.focus('end')} onInput = {() => this.autocomplete('end')} type="text" placeholder={t('mainData.description2')} name="search" id="end" className = {styles.searchBox} />
                            </div>
                        </form>
                    </div>
                    <a id="searchButton" onClick = {() => {this.showModel(); this.generateLink(); this.count(true)}} className = {[styles.chooseButton, styles.searchButton].join(' ')}>{t('mainData.search')}</a>
                    <div id = {styles.bottom}></div>       
                </div>
            </Tile>
        );
    };

};

export default withTranslation()(Main);