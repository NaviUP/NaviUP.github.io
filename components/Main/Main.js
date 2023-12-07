import React from "react";
import styles from './Main.scss';
import Tile from "../Tile/Tile";

// TO DO
// fetchData DONE
// autocomplete WIP
// list DONE
// resize

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
    }

    autocomplete = where => {
        let startId, endId;

        let inp = document.getElementById(where);

        var a, b, i, value = inp.value;
        let arr;

        if(where == 'start'){
            arr = this.state.from[0];
        }else {
            arr = this.state.to[0];
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
            if(arr[i]['name'].substr(0, value.length).toUpperCase() == value.toUpperCase()){
                b = document.createElement('DIV');
                b.setAttribute('id', arr[i]['id']);
                
                b.innerHTML = '<a><strong>' + arr[i]['name'].substr(0, value.length) + 
                '</strong>'+ arr[i]['name'].substr(value.length) + '<input type="hidden" value="' + arr[i]['name'] + '"></a>';

                const self = this;
                b.addEventListener('click', function(event){
                    inp.value = this.getElementsByTagName('input')[0].value;
                    
                    if(inp.id == 'start'){
                        startId = this.id;
                        self.setState({idStart: startId});
                        //setNewState();
                        // placeInfo(inp, startId, arr);
                    } else{
                        endId = this.id;
                        self.setState({idEnd: endId});
                        //setNewState();
                        // placeInfo(inp, endId, arr);
                        //buttons[0].click();
                    }
                    /*console.log(idStart);
                    console.log(idEnd);
                    console.log(inp.getAttribute('id'));*/
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
                if(elements != x[i] && elements != inp){
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        document.addEventListener('click', function(event){
            closeAllLists(event.target);
        });
    }

    focus = place => {
        document.getElementById(place).focus();
        document.getElementById(place).select();
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
        console.log(this.state.idStart, this.state.idEnd);
    }

    show = (type, where) => {
        let data = [];
        const logged = document.querySelector('dialog').getAttribute('data-login');
        
        if(logged == 'false'){
            fetch('src/data/app.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse[type])});
        }else {
            fetch('src/data/app2.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse[type])});
        }
        
        where == 'from' ? this.setState({from: data}) && this.setState({fromButton: type}) : this.setState({to: data}) && this.setState({toButton: type});
    
        const chooseButtons = document.querySelectorAll('.' + styles.chooseButton);
        
        for(let i = 0; i < chooseButtons.length; i++){
            const currentButton = chooseButtons[i];

            if(currentButton.getAttribute('data-place') == where && currentButton.getAttribute('data-data') == type){
                currentButton.classList.toggle(styles.chosen);
            }else if(currentButton.getAttribute('data-place') == where && currentButton.getAttribute('data-data') != type){
                currentButton.classList.remove(styles.chosen);
            }
        }
    }

    showModel = () => {
        setTimeout(() => {
            const modelHolder = document.getElementById('showModel');
            modelHolder.click();
        }, 100);
    }

    generateLink = () => {
        const link = this.state.idStart + '_' + this.state.idEnd;
        window.location.hash = link;
        return link;
    }
    
    count = (disable = false) => {
        const tileHeight = document.getElementById('main');
        const howMany = document.querySelectorAll('.' + styles.chosen);
        const inputs = document.querySelectorAll('input');

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
        }
    }

    render() {
        return (
            <Tile>
                <div id = 'main' className = {styles.component} data-height = ''>
                    <div className = {styles.where}>
                        <div id = {styles.info}>
                        </div>
                        <h1>Gdzie jesteś?</h1>
                        <a onClick={() => {this.show('people', 'from'); this.count()}} className = {styles.chooseButton} data-place='from' data-data="people">Osoba</a>
                        <a onClick={() => {this.show('rooms', 'from'); this.count()}} className = {styles.chooseButton} data-place='from' data-data="rooms">Pomieszczenie</a>
                        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                            <div className = {styles.autocomplete} data-data="">
                                <input onKeyDown={e => this.manualSearch('start', e)} onClick={() => this.focus('start')} onInput = {() => this.autocomplete('start')} type="text" placeholder="Jestem u/w np. Kaczmarek Adrian, 202-Sala dydaktyczna" name="search" id="start" className = {styles.searchBox} />                           
                            </div>
                        </form>
                    </div>
                    <div id="search" className = {[styles.search].join(' ')}>
                        <div id={styles.info}>
                        </div>
                        <h2>Czego szukasz?</h2>
                        <a onClick={() => {this.show('people', 'to'); this.count()}} className = {styles.chooseButton} data-place='to' data-data="people">Osoba</a>
                        <a onClick={() => {this.show('rooms', 'to'); this.count()}} className = {styles.chooseButton} data-place='to' data-data="rooms">Pomieszczenie</a>
                        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                            <div className = {styles.autocomplete} data-data="">
                                <input onKeyDown={e => this.manualSearch('end', e)} onClick={() => this.focus('end')} onInput = {() => this.autocomplete('end')} type="text" placeholder="Szukam np. Kaczmarek Adrian, 202-Sala dydaktyczna" name="search" id="end" className = {styles.searchBox} />
                            </div>
                        </form>
                    </div>
                    <a id="searchButton" onClick = {() => {this.showModel(); this.generateLink(); this.count(true)}} className = {[styles.chooseButton, styles.searchButton].join(' ')}>Szukaj drogi</a>
                    <div id = {styles.bottom}></div>       
                </div>
            </Tile>
        );
    };

};

export default Main;