import React from 'react';
import styles from './View.scss';
import * as THREE from '../../vendor/three/build/three.module';
import {OrbitControls} from '../../vendor/three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from '../../vendor/three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from '../../vendor/three/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from '../../vendor/three/examples/jsm/geometries/TextGeometry.js';
import Flip from '../Flip/Flip';
import Tile from "../Tile/Tile";


class View extends React.Component {
    state = {
        clicked: false,
        currentFocus: 0,
        data: [],
        IdRoom: 0,
    }

    getData = () => {
        const logged = document.querySelector('dialog').getAttribute('data-login');
        let data = []

        if(logged == 'false'){
            fetch('src/data/app.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse['rooms'])});
        }else {
            fetch('src/data/app2.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){data.push(parsedResponse['rooms'])});
        }
        
        this.setState({data: data})
    }

    loadView = () => {
        if(this.state.clicked){
            return
        }

        const canvas = document.querySelector('canvas');
        document.getElementById('viewer').style.display = 'block';
        if(canvas){
            canvas.remove();
        }

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        const container = document.getElementById('viewer');
    
        const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);
    
        const loader = new GLTFLoader();
        const loader2 = new FontLoader();
    
        const clock = new THREE.Clock(true);
        var time = 0;

        let id = 0;

        setTimeout(() => {
            id = window.location.hash.replace(/[A-Z]\*/).replace('#', '');
            console.log(id)
        }, 100)

    
        //loader2.load( '../../NaviUP.github.io/vendor/three/examples/fonts/Advent Pro_Regular.json', function ( font ) {
        loader2.load( 'src/vendor/three/examples/fonts/Advent Pro_Regular.json', function ( font ) {
        let textMesh1, materials;
        const floors = ['Podziemia', 'Parter', '1 Piętro', '2 Piętro', '3 Piętro', '4 Piętro'];

        materials = [
            new THREE.MeshPhongMaterial( { color: 0x40CCCC, flatShading: true } ), // front
            new THREE.MeshPhongMaterial( { color: 0x40CCCC } ) // side
        ];

        const textParams = {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        };

        let level = -50;
        for(let floor of floors){
            let geometry = new TextGeometry( floor, textParams);
    
            geometry.computeBoundingBox();
    
            textMesh1 = new THREE.Mesh( geometry, materials );
    
            textMesh1.position.x = 500;
            textMesh1.position.y = level;
            textMesh1.position.z = 500;
    
            textMesh1.rotation.y = Math.PI * 0.5;
            //textMesh1.rotateX(-1); "Pochylanie"
            scene.add(textMesh1);

            level += 50;
        }
    } );

        //loader.load('../../NaviUP.github.io/vendor/models/Schody.gltf', function(gltf){
        loader.load('src/vendor/models/Schody.gltf', function(gltf){
            const model = gltf.scene.children[0];
            model.scale.set(0.1,0.1,0.1);
            model.material.color.set(0xEE06FD);
            model.material.opacity = 0.2;
            model.material.transparent = true;
            scene.add(gltf.scene);
            //animate();
            },
            //function (xhr) {
            //  console.log((xhr.loaded/xhr.total * 100) + '% loaded');
            //}
        );

        //loader.load('../../NaviUP.github.io/vendor/models/Winda.gltf', function(gltf){
        loader.load('src/vendor/models/Winda.gltf', function(gltf){
            const model = gltf.scene.children[0];
            model.scale.set(0.1,0.1,0.1);
            //model.material.color.set(0xFB545E);
            model.material.opacity = 0.2;
            model.material.transparent = true;
            scene.add(gltf.scene);
            //animate();
            },
            //function (xhr) {
            //  console.log((xhr.loaded/xhr.total * 100) + '% loaded');
            //}
        );
        let whereToLook = null
        let goodNumbers = this.state.data[0]
        let newNumbers = []

        // const logged = document.querySelector('dialog').getAttribute('data-login');
        
        // if(logged == 'false'){
        //     fetch('src/data/app.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){goodNumbers.push(parsedResponse['rooms'])});
        // }else {
        //     fetch('src/data/app2.json').then(function(rawResponse){return rawResponse.json()}).then(function(parsedResponse){goodNumbers.push(parsedResponse['rooms'])});
        // }
        
        // this.setState({data: goodNumbers})

        setTimeout(() => {
            for(let i = 0; i < goodNumbers.length; i++){
                if(goodNumbers[i]['level'] == 9 || goodNumbers[i]['name'] == 'Bob') {continue}
                newNumbers.push(goodNumbers[i]['level'] + '-' + goodNumbers[i]['id'])
            }
        }, 200);

        setTimeout(() => {
            for(let i = 0; i < newNumbers.length; i++){
                loader.load('src/vendor/separateRooms/' + newNumbers[i] + '.gltf',function(gltf){
                    const model = gltf.scene;
                    model.scale.set(0.1,0.1,0.1);
                    let position;
                    let center = new THREE.Vector3();
                    
                    let number = newNumbers[i];
                    if(id.length == 1 && number[number.length - 2] == '-') {
                        number = number.slice(number.length - 1, number.length);
                    } else if(id.length == 2 && number[number.length - 3] == '-') {
                        number = number.slice(number.length - 2, number.length);
                    } else if(id.length == 3 && number[number.length - 4] == '-') {
                        number = number.slice(number.length - 3, number.length);
                    }


                    for(let i in model.children){
                        if(number == id) {
                            console.log(number)
                            model.children[i].material.color.set(0xE40467);
                            position = model.children[0];
                            position.geometry.computeBoundingBox();
                            console.log(position.geometry.boundingBox.getCenter(center));
                            whereToLook = position.geometry.boundingBox.getCenter(center);
                        } else {
                            model.children[i].material.color.set(0x0467E4);
                            model.children[i].material.opacity = 0.2;
                            model.children[i].material.transparent = true;
                        }

                    }
                    scene.add(gltf.scene);
                    
                    
                    // ;
                    // position.geometry.center
                    
                    // camera.lookAt(whereToLook.x/10, whereToLook.y/10, whereToLook.z);
                    //animate();
                    },
    
                    //function (xhr) {
                    //  console.log((xhr.loaded/xhr.total * 100) + '% loaded');
                    //}
                );
            }
        }, 500);
        
        window.addEventListener('resize', () => {
            if(document.querySelector('canvas')){
                camera.aspect = container.innerWidth/ container.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.innerWidth, container.innerHeight);
    
                document.getElementById('showModel').click();
            }
        });

        const renderer = new THREE.WebGLRenderer({antialias:true});
        //renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.domElement.id = 'model';
        //document.body.appendChild(container);
        container.children[1].appendChild(renderer.domElement);
    
        const canva = document.querySelector('canvas')
        canva.style.height = '100%'
        canva.style.width = '100%'

        const offsetHeight = container.offsetHeight;
        const offsetWidth = container.offsetWidth;

        camera.position.x = 300 + 1000;
        camera.position.z = 500 + 1000;
        camera.position.y = 300;
        camera.lookAt(300, -100, 500);
        
        const controls = new OrbitControls(camera, renderer.domElement);
        // controls.addEventListener('change', renderer);

        controls.screenSpacePanning = false;

        controls.minDistance = 100;
        controls.maxDistance = 5000;

        controls.maxPolarAngle = Math.PI / 2;
    
        const hilight = new THREE.AmbientLight(0xFFFFFF,20);
        scene.add(hilight);
    
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF,20);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow = true;
        scene.add(directionalLight)
    
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
    
        for ( let i = 0; i < 10000; i ++ ) {
    
            vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // x
            vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // y
            vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // z
    
        }
    
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    
        const particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
        scene.add( particles );
    
        //const cameraHelper = new THREE.CameraHelper(camera2);
        //scene.add(cameraHelper);
    
        let animationLoop = null;
        renderer.dispose();
        function animate() {
            if(animationLoop){
                cancelAnimationFrame(animationLoop)
            }
            animationLoop = requestAnimationFrame(() => animate());

            renderer.clear();
    
            // clock.getDelta();
            // time = clock.elapsedTime.toFixed(2);
            // camera.position.x = 300 + 1000 * (Math.sin(time * 0.2));
            // camera.position.z = 500 + 1000 * (Math.cos(time * 0.2));
            // camera.position.y = 300;
            // camera.lookAt(300, -100, 500);
            
            //console.log(document.querySelector('canvas').getBoundingClientRect());
            // renderer.setScissorTest(true);
    
            // renderer.setScissor(0, 0, offsetWidth, offsetHeight);
            // renderer.setViewport(0, 0, offsetWidth, offsetHeight);
            controls.update();
            renderer.render(scene, camera);
            
            // if(document.querySelector('canvas')){
            //     requestAnimationFrame(animate);
            // }
    
        }
        //this.setState({clicked: true})
        const stopAnimatioLoop = () => {
            cancelAnimationFrame(animationLoop);
            console.log('it works!');
        }
        animate();
        // setTimeout(() => {stopAnimatioLoop()}, 3000);
    
        const buttons = document.getElementById('viewer').querySelectorAll('a');
        buttons.forEach(element => {
            element.addEventListener('click', () => {
                stopAnimatioLoop();
            });
        });
    };

    autocomplete = where => {
        let roomId;

        let inp = document.getElementById(where);

        var a, b, i, value = inp.value;
        let arr;

        arr = this.state.data[0];

        closeAllLists();
        
        if(!value) { return false;}

        a = document.createElement('DIV');
        a.setAttribute('id', inp.id + 'autocomplete-list');
        a.setAttribute('class', styles.autocompleteItems);

        inp.parentNode.appendChild(a);

        for(i = 0; i < arr.length; i++){
            if(arr[i]['name'].substr(0, value.length).toUpperCase() == value.toUpperCase()){
                b = document.createElement('DIV');
                b.setAttribute('id', arr[i]['id']);
                
                b.innerHTML = '<a><strong>' + arr[i]['name'].substr(0, value.length) + 
                '</strong>'+ arr[i]['name'].substr(value.length) + '<input type="hidden" value="' + arr[i]['name'] + '"></a>';

                const self = this;
                b.addEventListener('click', function(event){
                    inp.value = this.getElementsByTagName('input')[0].value;
                    
                    roomId = this.id;
                    self.setState({IdRoom: roomId});
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


    generateLink = () => {
        const link = this.state.IdRoom;
        window.location.hash = link;
        return link;
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

    render() {
        return (
            <div>
                <Tile>
                    <div id = 'main' className = {styles.main}>
                        <div className = {styles.where}>
                            <div id = {styles.info}>
                            </div>
                            <h1>Jakiego pokoju szukasz?</h1>
                            <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                                <div className = {styles.autocomplete} data-data="">
                                    <input onKeyDown={e => this.manualSearch('start', e)} onClick={() => {this.focus('start'); this.getData()}} onInput = {() => this.autocomplete('start')} type="text" placeholder="np. 202" name="search" id="start" className = {styles.searchBox} />                           
                                </div>
                            </form>
                        </div>
                    </div>
                </Tile>
                <div id = 'viewer' className = {styles.model}>
                    <Flip />
                    <div />
                    <a id = 'showModel' onClick = {() => {this.loadView(); this.generateLink()}}>Model</a>
                </div>
            </div>
        )
    }
}

export default View;