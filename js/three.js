import * as THREE from '../vendor/three/build/three.module.js';
import {OrbitControls} from '../vendor/three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from '../vendor/three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from '../vendor/three/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from '../vendor/three/examples/jsm/geometries/TextGeometry.js';

// Local testing
export function loadPath(id, isOrto = false){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const container = document.getElementById('model');

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);

    const camera2 = new THREE.OrthographicCamera(1, 350, -1, -850, 1, 50);
    camera2.position.x = 170;
    camera2.position.y = 50 + 50 * container.getAttribute('data-start');
    camera2.position.z = 15;

    const camera3 = new THREE.OrthographicCamera(1, 350, -1, -850, 1, 50);
    camera3.position.x = camera2.position.x;
    camera3.position.y = 50 + 50 * container.getAttribute('data-end');
    camera3.position.z = camera2.position.z;

    const camera4 = new THREE.OrthographicCamera(1, 850, -1, -350, 1, 5000);
    camera4.position.x = 800;
    camera4.position.y = 250;
    camera4.position.z = 850;

    const loader = new GLTFLoader();
    const loader2 = new FontLoader();

    const clock = new THREE.Clock(true);
    var time = 0;

    let path = id;

    const splitedID = id.split('_');

    if(parseInt(splitedID[0]) > parseInt(splitedID[1])){
        path = splitedID[1] + '_' + splitedID[0];
    }

    if(path == '999_999'){
        loader.load('../../vendor/models/test1.gltf',function(gltf){
        //loader.load('../vendor/models/test1.gltf', function(gltf){
            const model = gltf.scene.children[0];
            model.scale.set(500,500,500);
            model.position.x = 300;
            model.position.y = 400;
            model.position.z = 500;

            
            
            scene.add(gltf.scene);
            //animate();
        },
        //function (xhr) {
          //  console.log((xhr.loaded/xhr.total * 100) + '% loaded');
        //}
    );
    }else {

        loader2.load( '../../vendor/three/examples/fonts/Advent Pro_Regular.json', function ( font ) {
        //loader2.load( '../vendor/three/examples/fonts/Advent Pro_Regular.json', function ( font ) {
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

        loader.load('../../vendor/gltf paths/' + path + '.gltf',function(gltf){
        //loader.load('../vendor/gltf paths/' + path + '.gltf', function(gltf){
            const model = gltf.scene.children[0];
            model.scale.set(0.1,0.1,0.1);
            model.position.set(0,5,0);
            model.material.color.set(0xFB545E);
            scene.add(gltf.scene);
            //animate();
            },
            //function (xhr) {
            //  console.log((xhr.loaded/xhr.total * 100) + '% loaded');
            //}
        );

        loader.load('../../vendor/models/Schody.gltf', function(gltf){
        //loader.load('../vendor/models/Schody.gltf', function(gltf){
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

        loader.load('../../vendor/models/Winda.gltf', function(gltf){
        //loader.load('../vendor/models/Winda.gltf', function(gltf){
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

        for(let i = -1; i < 5;i++){
            loader.load('../../vendor/models/' + i + '.gltf',function(gltf){
            //loader.load('../vendor/models/' + i + '.gltf',function(gltf){
                const model = gltf.scene;
                model.scale.set(0.1,0.1,0.1);

                for(let i in model.children){
                    model.children[i].material.color.set(0x0467E4);
                    model.children[i].material.opacity = 0.2;
                    model.children[i].material.transparent = true;
                }
        
                scene.add(gltf.scene);
                //animate();
                },

                //function (xhr) {
                //  console.log((xhr.loaded/xhr.total * 100) + '% loaded');
                //}
            );
        }
    }

    const renderer = new THREE.WebGLRenderer({antialias:true});
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    //renderer.domElement.id = 'model';
    //document.body.appendChild(container);
    container.children[0].appendChild(renderer.domElement);

    const offsetHeight = container.offsetHeight;
    const offsetWidth = container.offsetWidth;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);

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

    function animate() {
        
        renderer.clear();

        clock.getDelta();
        time = clock.elapsedTime.toFixed(2);
        camera.position.x = 300 + 1000 * (Math.sin(time * 0.2));
        camera.position.z = 500 + 1000 * (Math.cos(time * 0.2));
        camera.position.y = 300;
        camera.lookAt(300, -100, 500);
        
        //console.log(document.querySelector('canvas').getBoundingClientRect());
        renderer.setScissorTest(true);

        if(isOrto){

            camera2.lookAt(camera2.position.x, camera2.position.y - 50, camera2.position.z);
            camera3.lookAt(camera3.position.x, camera3.position.y - 50, camera3.position.z);
            camera4.lookAt(300, 250, 850);
    
            renderer.clear();
             
            renderer.setScissor(0, 0, offsetWidth / 2, offsetHeight / 2);
            renderer.setViewport(0, 0, offsetWidth / 2, offsetHeight / 2);
            renderer.render(scene, camera);
            
            renderer.setScissor(0, offsetHeight / 2, offsetWidth / 2, offsetHeight / 2);
            renderer.setViewport(0, offsetHeight / 2, offsetWidth / 2, offsetHeight / 2);
            renderer.render(scene, camera4);
            
            renderer.setScissor(offsetWidth / 2, 0, offsetWidth / 4, offsetHeight);
            renderer.setViewport(offsetWidth / 2, 0, offsetWidth / 4, offsetHeight);
            renderer.render(scene, camera2);
    
            renderer.setScissor(offsetWidth / 1.35, 0, offsetWidth / 4, offsetHeight);
            renderer.setViewport(offsetWidth / 1.35, 0, offsetWidth / 4, offsetHeight);
            renderer.render(scene, camera3);
        }else {
            renderer.setScissor(0, 0, offsetWidth, offsetHeight);
            renderer.setViewport(0, 0, offsetWidth, offsetHeight);
            renderer.render(scene, camera);
        }
        

        if(document.querySelector('canvas')){
            requestAnimationFrame(animate);
        }

    }

    animate();
}