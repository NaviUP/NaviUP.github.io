import { loadPath } from "./three.js";
import * as PANOLENS from "./panolens.module.js";

const darkModeButton = document.querySelector(".darkModeButton");

darkModeButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    document.querySelector('body').classList.toggle('darkMode');
});

const currentLocation = window.location;
let doneOneced = false;
let button1 = false;
const maxWidth = 1000;
let logged = false;

function initMain() {
    let button2 = false;
    function checkHash(inp, arr){
        const hash = window.location.hash;
        if(hash){
            const hashID = window.location.hash.replace('#id=', '');
            for(let i = 0; i < arr.length; i++){
                if(arr[i]['id'] == hashID){
                    if(window.innerWidth > maxWidth){
                        inp.parentElement.parentElement.parentElement.querySelector('[data-data="rooms"]').classList.add('chosen');
                        inp.value = arr[i]['name'];
                        idStart = hashID;
                        resizeMe.call(inp);
                        //autocomplete(inp, roomsName);
                        wrapperVisibility(true, inp.getAttribute('id'));
                        howManyChosens(true);
                        //mobilePick(inp.parentNode.querySelector('#mobileSearch'),arr)
                        autocomplete(inp, arr);
                        button1 = true;
                        placeInfo(inp, idStart, arr);
                    }else {
                        mobilePick(chooseButtons[1], hashID);
                        chooseButtons[1].click();
                        //resizeMe.call(chooseButtons[1].parentElement.querySelector('select'));
                        //chooseButtons[1].parentElement.querySelector('select').click();
                        for(let i = 0; i < chooseButtons.length; i++){
                            if(!i == 1){
                                mobilePick(chooseButtons[i]);
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
 
    let input = document.querySelectorAll('input');

    function mobilePick(inp, hash){

        inp.addEventListener('click', function(event){
            event.preventDefault();
            var a, b, c;
            let arr;
            let place = inp.parentElement.classList;
            let inputParent = inp.parentElement;

            if(inputParent.querySelector('.searchBox')){
                inputParent.querySelector('.searchBox').remove();
            }

            if(inputParent.querySelectorAll('.autocomplete')[1]){
                inputParent.querySelectorAll('.autocomplete')[1].remove();
            }

            wrapperVisibility('nope', place);

            a = document.createElement('div');
            if(place.contains('where')){
                a.setAttribute('id', 'start');
            }else{
                a.setAttribute('id', 'end');
            }
            a.classList.add('autocomplete');
            a.setAttribute('style', 'display:flex; justify-content:center;');
            wrapperVisibility('nope', a.getAttribute('id'));

            if(inputParent.querySelector('.autocomplete').getAttribute('data-data') == 'people'){
                arr = peopleName;
            }else if(inputParent.querySelector('.autocomplete').getAttribute('data-data') == 'rooms'){
                arr = roomsName;
            }

            if(!arr) {return}

            b = document.createElement('div');
            b.classList.add('select-header');
            if(a.getAttribute('id') == 'start'){
                if(arr == peopleName){
                    b.innerHTML = 'Jestem u...';
                }else if(arr == roomsName){
                    b.innerHTML = 'Jestem w...';
                }
            }else if(a.getAttribute('id') == 'end'){
                b.innerHTML = 'Szukam...';
            }
            a.appendChild(b);

            c = document.createElement('div');
            c.classList.add('select-box');
            a.appendChild(c);

            for(let i = 0; i < arr.length; i++){
                let newPlace =  document.createElement('div');
                newPlace.innerHTML = arr[i]['name'];
                newPlace.setAttribute('href', '#id=' + arr[i]['id']);

                newPlace.addEventListener('click', () => {
                    b.style.width = newPlace.innerHTML.length + 'ch';

                    if(a.getAttribute('id') == 'start'){
                        idStart = arr[i]['id'];
                        placeInfo(inputParent.querySelectorAll('.autocomplete')[1], idStart, arr);
                        howManyChosens(true);
                    }else{
                        idEnd = arr[i]['id'];
                        placeInfo(inputParent.querySelectorAll('.autocomplete')[1], idEnd, arr);
                    }

                    wrapperVisibility(true, a.getAttribute('id'));

                    b.innerHTML = newPlace.innerHTML;

                    if(window.location.hash){
                        window.location.hash.replace('#id', 'what');
                        window.location.hash = '#id=' + arr[i]['id'];
                    }else{
                        window.location.hash = '#id=' + arr[i]['id'];
                    }

                    setTimeout(() => {closeAllLists(this.parentElement.querySelector('.select-box'))}, 0);
                    wrapperVisibility(true, a.getAttribute('id'));
                });
                c.appendChild(newPlace);
                if(arr[i]['id'] == hash){
                    setTimeout(() => {newPlace.click()}, 0);
                    //closeAllLists(this);
                    //newPlace.selected = true;
                    //setTimeout(resizeMe.call(a),1000);
                }
            }

            b.addEventListener('click', function(event){
                event.stopPropagation();
                closeAllLists(this);
                this.nextSibling.classList.toggle('nonVisible');
            });

            inputParent.querySelector('.autocomplete').appendChild(a);
            setTimeout(a.lastChild.click(), 500);
        });

        function closeAllLists(elements){
            var x = document.getElementsByClassName('select-box');

            for(let i = 0; i < x.length; i++){
                if(elements == x[i]){
                    x[i].classList.toggle('nonVisible');
                    //x[i].parentNode.removeChild(x[i]);
                }
            }
        }
    }

    function autocomplete(inp, arrr){
        let currentFocus;

        inp.addEventListener('click', () => {
            inp.focus();
            inp.select();
            wrapperVisibility('nope', inp.getAttribute('id'));
        });

        inp.addEventListener('input', function(event){
            event.preventDefault();
            var a, b, i, value = this.value;
            let arr;

            if(arrr) {arr = arrr};

            if(inp.parentElement.getAttribute('data-data') == 'people'){
                arr = peopleName;
            }else if(inp.parentElement.getAttribute('data-data') == 'rooms'){
                arr = roomsName;
            }

            closeAllLists();
        
            if(!value) { return false;}
            currentFocus += -1;

            a = document.createElement('DIV');
            a.setAttribute('id', this.id + 'autocomplete-list');
            a.setAttribute('class', 'autocomplete-items');

            this.parentNode.appendChild(a);

            if(value == 'Bob'){
                if(inp.id == 'start'){
                    idStart = 78;
                    placeInfo(inp, idStart, arr);
                    if(inp.value != ''){
                        howManyChosens(true);
                    }
                } else{
                    idEnd = 78;
                    placeInfo(inp, idEnd, arr);
                    //buttons[0].click();
                }
                closeAllLists();
                wrapperVisibility(true, inp.getAttribute('id'));
                resizeMe.call(inp);
            }

            if(value == "It's him"){
                if(inp.id == 'start'){
                    idStart = 999;
                    placeInfo(inp, idStart, arr);
                    if(inp.value != ''){
                        howManyChosens(true);
                    }
                } else{
                    idEnd = 999;
                    placeInfo(inp, idEnd, arr);
                    //buttons[0].click();
                }
                closeAllLists();
                wrapperVisibility(true, inp.getAttribute('id'));
                resizeMe.call(inp);
            }

            for(i = 0; i < arr.length; i++){
                if(arr[i]['name'].substr(0, value.length).toUpperCase() == value.toUpperCase()){
                    b = document.createElement('DIV');
                    b.setAttribute('id', arr[i]['id']);

                    b.innerHTML = '<a href=#id=' + b.id + '><strong>' + arr[i]['name'].substr(0, value.length) + 
                    '</strong>'+ arr[i]['name'].substr(value.length) + '<input type="hidden" value="' + arr[i]['name'] + '"></a>';

                    b.addEventListener('click', function(event){
                        inp.value = this.getElementsByTagName('input')[0].value;
                        
                        if(inp.id == 'start'){
                            idStart = this.id;
                            placeInfo(inp, idStart, arr);
                            if(inp.value != ''){
                                howManyChosens(true);
                            }
                        } else{
                            idEnd = this.id;
                            placeInfo(inp, idEnd, arr);
                            //buttons[0].click();
                        }
                        /*console.log(idStart);
                        console.log(idEnd);
                        console.log(inp.getAttribute('id'));*/
                        closeAllLists();
                        wrapperVisibility(true, inp.getAttribute('id'));
                        resizeMe.call(inp);
                    });
                    a.appendChild(b);
                }
            }
        });

        inp.addEventListener('keydown', function(event){
            var x = document.getElementById(this.id + 'autocomplete-list');
            if(x) {x = x.getElementsByTagName('div');}
            
            if(event.KeyCode == 40){
                currentFocus++;
                console.log('wod')
                
                addActive(x);
            } else if(event.KeyCode == 38){
                currentFocus--;
                
                addActive(x);
            } else if(event.KeyCode == 13){
                console.log('work?')
                event.preventDefault();
                if(currentFocus > -1){
                    if (x) {x[currentFocus].click();}
                }
            }
        });
        
        function addActive(x){
            if(!x) {return false;}
            
            removeActive(x);
            if(currentFocus >= x.length) {currentFocus = 0;}
            if(currentFocus < 0) {currentFocus = x.length-1;}

            x[currentFocus].classList.add('autocomplete-active');
        }

        function removeActive(x){
            for(i = 0; i < x.length; i++){
                x[i].classList.remove('autocomplete-active');
            }
        }
        
        function closeAllLists(elements){
            var x = document.getElementsByClassName('autocomplete-items');

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

    let peopleName = [];
    let roomsName = [];

    // function fetchData(what = '../db/app.json'){
    function fetchData(what = '../../db/app.json'){
        if(logged){
            // what = '../db/app2.json';
            what = '../../db/app2.json';
        }
        fetch(what).then(function(rawResponse){
            return rawResponse.json();
        }).then(function(parsedResponse){
            peopleName = [];
            roomsName = [];
            for(let i = 0; i < parsedResponse['people'].length; i++){
                peopleName.push(parsedResponse['people'][i]);
            }

            for(let i = 0; i < parsedResponse['rooms'].length-2; i++){
                roomsName.push(parsedResponse['rooms'][i]);
            }

            if(window.location.hash){
                checkHash(document.querySelector('.searchBox'), roomsName);
            }
        })
    }

    fetchData();

    const restWrapper = document.querySelector('.search');
    const searchButton = document.querySelector('.searchButton');

    function wrapperVisibility(isVisible, id) {
        if(isVisible == true && id == 'start'){
            tile.style.maxHeight = '400px';
            //document.querySelector('.tile').classList.add('long')
            restWrapper.classList.remove('nonVisible');

        } else if(id == 'start'){
            tile.style.maxHeight = '200px';
            //document.querySelector('.tile').classList.remove('long');
            modelHolder.classList.add('fade');
            restWrapper.classList.add('nonVisible');
            searchButton.classList.add('nonVisible');
            textHolder.classList.add('nonVisible');

            setTimeout(() => {

                if(modelHolder.childNodes.length > 5){
                    modelHolder.querySelector('canvas').remove();
                    const links = modelHolder.querySelectorAll('a');

                    for(let i = 0; i < links.length; i++){
                        links[i].remove();
                    }
                }
            }, 1000)

            searchButton.classList.add('nonVisible'); 

        }else if(isVisible == true && id == 'end'){
            searchButton.classList.remove('nonVisible');
            
        }else if(isVisible == false){
            //tile.style.maxHeight = '800px';
            //document.querySelector('.tile').classList.remove('long');
            restWrapper.classList.add('nonVisible');
            searchButton.classList.add('nonVisible');
            textHolder.classList.add('nonVisible');

            if( modelHolder.querySelector('canvas')){
                modelHolder.querySelector('canvas').remove();
                const links = modelHolder.querySelectorAll('a');

                for(let i = 0; i < links.length; i++){
                    links[i].remove();
                } 
            }
        }
    }

    const inputs = document.querySelectorAll('.searchBox');
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', resizeMe);
    }

    function resizeMe() {
        if(this.value.length > 10){
            this.style.width = this.value.length + 'ch';
        } else {
            this.style.width = '40%';
        }
    }

    let id, idStart, idEnd;
    const modelHolder = document.getElementById('model');

    searchButton.addEventListener('click', () => {
        id = idStart + '_' + idEnd;
            
        if(idStart == idEnd && id != '999_999'){
            alert('Wprowadzone dane są identyczne. Proszę je zmienić');
        }else{
            modelHolder.classList.add('fade');
            setTimeout(() => {modelHolder.classList.remove('fade');}, 1600);
            setTimeout(() => {loadPath(id)}, 1500);
            setTimeout(() => {
                const modelButton = document.createElement('a');
                const ortoButton = document.createElement('a');

                modelButton.setAttribute('data-link', 'model');
                ortoButton.setAttribute('data-link', 'orto');

                modelButton.innerHTML = 'Model';
                ortoButton.innerHTML = 'Orto';

                modelHolder.appendChild(modelButton);
                modelHolder.appendChild(ortoButton);

                modelButton.addEventListener('click', () => {
                    setTimeout(() => {
                        modelHolder.querySelector('canvas').remove();
                        loadPath(id);
                    }, 600);

                    setTimeout(() => {modelHolder.classList.remove('fade')}, 700)

                    modelHolder.classList.add('fade');
                });

                ortoButton.addEventListener('click', () => {
                    setTimeout(() => {
                        modelHolder.querySelector('canvas').remove();
                        loadPath(id, true);
                    }, 600);

                    setTimeout(() => {modelHolder.classList.remove('fade')}, 700)

                    modelHolder.classList.add('fade');
                });

                modelText();
            }, 1500);
            
            for(let room of roomsName){
                if(room['id'] == idStart){
                    modelHolder.setAttribute('data-start', room['level']);
                }else if(room['id'] == idEnd){
                    modelHolder.setAttribute('data-end', room['level']);
                }
            }

            modelHolder.setAttribute('data-orto', false);
        }
        
        tile.style.maxHeight = '200px';
        //document.querySelector('.tile').classList.remove('long');
        restWrapper.classList.add('nonVisible');
        //restWrapper.classList.add('none');
        searchButton.classList.add('nonVisible');

        const questionMarks = document.querySelectorAll('.info-icon');
        for(let i = 0; i < questionMarks.length; i++){
            questionMarks[i].remove();
        }

        const fields = document.querySelectorAll('input');;
        setTimeout(() => {for(let i = 0; i < fields.length; i++){
            fields[i].value = '';
        }}, 1000);
    });

    const chooseButtons = document.querySelectorAll('.chooseButton[data-data]');
    
    function choseButtonAction(){
        for(let i = 0; i < chooseButtons.length; i++){
            const currentButton = chooseButtons[i];
            currentButton.addEventListener('click', () => {
                const dataBase = currentButton.getAttribute('data-data');
                currentButton.classList.add('chosen');
                
                const childrens = currentButton.parentElement.children;
                for(let i = 0; i < childrens.length; i++){
                    if(childrens[i] != currentButton && childrens[i].classList.contains('chosen')){
                        childrens[i].classList.remove('chosen');
                    }
                }

                if(currentButton.parentElement.querySelector('input') && currentButton.parentElement.querySelector('input').value != ''){
                    currentButton.parentElement.querySelector('input').value = '';
                }
                
                if (currentButton.parentElement.classList.contains('where') && !button1 && window.innerWidth > maxWidth){
                    autocomplete(currentButton.parentElement.querySelector('input'));
                    button1 = true;
                }

                if (currentButton.parentElement.classList.contains('search') && !button2 && window.innerWidth > maxWidth){
                    autocomplete(currentButton.parentElement.querySelector('input'));
                    button2 = true;
                }

                currentButton.parentElement.querySelector('.autocomplete').setAttribute('data-data', dataBase);

                howManyChosens();
            });
        }
    }

    choseButtonAction();

    if(window.innerWidth < maxWidth){
        for(let i = 0; i < chooseButtons.length; i++){
            mobilePick(chooseButtons[i]);
        }
    }

    function howManyChosens(setHight = false, button){
        const activeButtons = document.querySelectorAll('.chosen');
        const tile = document.querySelector('.tile');

        if(activeButtons.length == 0){
            //tile.setAttribute('style', 'height: 125px');
            tile.querySelectorAll('form')[0].classList.add('nonVisible');
        }else if(activeButtons.length == 2){
            //tile.removeAttribute('style');
            tile.querySelectorAll('form')[1].classList.remove('nonVisible');
        }else if(activeButtons.length == 1){
            //if(setHight) {
                //tile.setAttribute('style', 'height: 290px');
                //if(button && button.parentElement.querySelector('input').getAttribute('id') == 'start'){
                    //wrapperVisibility(false);
                    //tile.removeAttribute('style');
                    //tile.querySelectorAll('form')[1].classList.remove('nonVisible');
                //}
            //}else{
               // tile.removeAttribute('style');
                tile.querySelector('form').classList.remove('nonVisible');
                tile.querySelectorAll('form')[1].classList.add('nonVisible');
            //}
        }
    }

    setTimeout(() =>{howManyChosens()}, 200);

    function information(ifDestroy = false, info, id) {
        if(ifDestroy){
            let pan = info.parentElement.querySelector('#panorama');
            pan.remove();
            info.querySelector('h4').remove();
            info.querySelector('h5').remove();
            document.querySelector('#panolens-style-addon').remove();
        }else{
            const who = document.createElement('h4');
            const email = document.createElement('h5');
            const pan = document.createElement('div');
            pan.setAttribute('id', 'panorama');

            if(id['description']['title'] && id['description']['email']){
                who.innerHTML = id['description']['title'];
                email.innerHTML = id['description']['email'];
            }

            info.appendChild(who);
            info.appendChild(email);
            info.appendChild(pan);

            // const panorama = new PANOLENS.ImagePanorama( '../../images/rooms/' + id['description']['panorama']);
            const panorama = new PANOLENS.ImagePanorama( '../images/rooms/' + id['description']['panorama']);
            const viewer = new PANOLENS.Viewer({
                container: info.querySelector('div')
            });
            viewer.add( panorama );
        }
    }

    function placeInfo(container, id, arr){

        if(container.parentElement.parentElement.parentElement.querySelector('i')){
            container.parentElement.parentElement.parentElement.querySelector('i').remove();
        }
        
        let hasDescription, place;

        for(let i = 0; i < arr.length; i++){
            if(container.childNodes.length == 0){
                if(arr[i]['id'] == id && arr[i]['name'] == container.value && arr[i]['description']){
                    hasDescription = true;
                    place = arr[i];
                    continue
                }
            }else {
                if(arr[i]['id'] == id && arr[i]['name'] == container.childNodes[1].childNodes[i].innerHTML && arr[i]['description']){
                    hasDescription = true;
                    place = arr[i];
                    continue
                }
            }
        }

        if(hasDescription){
            //icon.classList.remove('nonVisible');
            const newIcon = document.createElement('i')
            newIcon.setAttribute('class', 'fa fa-question info-icon');
            container.parentElement.parentElement.parentElement.appendChild(newIcon);
            const icon = container.parentElement.parentElement.parentElement.querySelector('.info-icon');

            icon.addEventListener('click', function(ev){
                const info = icon.parentElement.querySelector('#info');

                if(info.querySelector('#panorama')){
                    info.classList.toggle('info');
                    information(true, info);
                }else if(info.parentElement.querySelector('[id=start]')){
                    info.classList.toggle('info');
                    information(false, info, place);
                }else if(info.parentElement.querySelector('[id=end]')){
                    info.classList.toggle('info');
                    information(false, info, place);
                }
            },);
        }else{
            //icon.classList.add('nonVisible');
            //icon.removeEventListener('click');
        }
    }

    function teams() {
        const wrapper = document.querySelector('.aboutFlex');

        if(!wrapper){
            return;
        }

        const mask = wrapper.querySelector('#mask');
        const image = wrapper.querySelector('#aboutImg');

        for(let box of wrapper.childNodes){
            if(box.innerHTML && box.getAttribute('id') != 'help' && box.getAttribute('id') != null){
                let newMask = box.getAttribute('id');

                box.addEventListener('mouseover', () => {
                    mask.setAttribute('src', 'images/masks/' + newMask + '.png');

                    mask.classList.toggle('visible');
                    image.classList.toggle('gray');
                });

                box.addEventListener('mouseout', () => {
                    mask.classList.toggle('visible');
                    image.classList.toggle('gray');
                });
            }
        }
    }

    const textHolder = modelHolder.querySelector('#textHolder');

    function modelText() {
        const textButtons = modelHolder.querySelectorAll('a');
        const modelTexts = modelHolder.querySelectorAll('p');

        for(let texButton of textButtons){
            texButton.addEventListener('click', () => {
                let viewType = texButton.getAttribute('data-link');
                textHolder.classList.remove('nonVisible');

                if(viewType == 'model'){
                    for(let modelText of modelTexts){
                        
                        if(modelText.getAttribute('id') == 'model3d'){
                            setTimeout(() => {modelText.classList.add('visible')}, 400);
                        }else {
                            modelText.classList.remove('visible');
                        }
                    }
                }else {
                    for(let modelText of modelTexts){

                        if(modelText.getAttribute('id') == 'model3d'){
                            modelText.classList.remove('visible');
                        }else {
                            setTimeout(() => {modelText.classList.add('visible')}, 400);
                        }
                    }
                }


            });
        }

        textButtons[0].click();
    }

    const linksDOM = document.querySelector('.links');
    const tile = document.querySelector('.tile');
    const templates = document.querySelectorAll('[type="text/x-handlebars-template"]');

    if(!doneOneced){
        for(let link of linksDOM.querySelectorAll('a')){
            link.addEventListener('click', (event) => {
                let href = link.getAttribute('href').replace('#','');
                event.preventDefault();
    
                /*if(tile.children[0].classList.contains('main') || href != 'main'){
                    tile.removeAttribute('style');
                    tile.classList.add('autoHeight');
                }else {
                    tile.classList.remove('autoHeight');
                }*/
                if(href == 'project'){
                    tile.classList.add('autoHeight');
                    tile.style.maxHeight = '600px';
                }else if(href == 'about'){
                    tile.classList.add('autoHeight');
                    tile.style.maxHeight = '5000px';
                }else if(href == 'contact'){
                    tile.classList.add('autoHeight');
                    tile.style.maxHeight = '600px';
                }else {
                    tile.classList.remove('autoHeight');
                    tile.style.maxHeight = '400px';
                }
                
                wrapperVisibility(false);
                tile.children[0].remove();
    
                let html;
    
                for(let template of templates){
                    const templateID = template.getAttribute('id').replace('-template', '');
                    if(href == templateID){
                        html = Handlebars.compile(template.innerHTML);
                    }
                }
    
                tile.innerHTML = html();
    
                if(href == 'main'){
                    button1 = false;
                    button2 = false;
                    initMain();
                }

                teams();
            });
        }
    const loginButton = document.getElementById('loginButton');
    const login = document.getElementById('loginShowButton');

    loginButton.parentElement.querySelector('h3').innerHTML = 'Potwierdź że jesteś z UPWR';

    loginButton.parentElement.querySelector('input').addEventListener('keydown', (event) => {
        if(event.key == 'Enter'){
            event.preventDefault();
            ValidateEmail(loginButton.parentElement.querySelector('input'));
        }
    });

    function ValidateEmail(inputText) {
        var mailformat = /[0-9]{6}@student.upwr.edu.pl/;
        var mailformat2 = /[a-z].[a-z]@upwr.edu.pl/;
        if(inputText.value.match(mailformat) || inputText.value.match(mailformat2)) {
            // alert("Wpisany mail jest poprawny!");
            //document.form1.text1.focus();
            loginButton.parentElement.querySelector('h3').innerHTML = 'Wpisany mail jest prawidłowy!';
            // fetchData('../db/app2.json');
            fetchData('../../db/app2.json');
            logged = true;
            setTimeout(() => {
                loginButton.parentElement.querySelector('button[id="closeButton"]').click();
                login.innerHTML = 'Zalogowany!';
                document.querySelector('.chosen').click();
            }, 1500);
        }
        else {
            loginButton.parentElement.querySelector('h3').innerHTML = 'Wpisany mail jest nieprawidłowy!';
            // alert("Wpisany mail nies nieprawidłowy!");
            //document.form1.text1.focus();
            logged = false;
            // fetchData('../db/app.json');
            fetchData('../../db/app.json');
        }
    }

    loginButton.addEventListener('click', () => {
        ValidateEmail(loginButton.parentElement.querySelector('input'));
    });
    }
    doneOneced = true;
}

const linksDOM = document.querySelector('.links');
const arrow = document.getElementById('arrow');
arrow.addEventListener('click', () => {
    arrow.classList.toggle('turn');
    linksDOM.classList.toggle('hidden');
});

const arrowAnimations = arrow.getAnimations()[0];

if(arrowAnimations){
    setInterval( () => {arrowAnimations.play()}, 6000);
}
initMain();