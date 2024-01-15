import React from 'react';
import * as THREE from '../../vendor/three/build/three.module';
import {OrbitControls} from '../../vendor/three/examples/jsm/controls/OrbitControls.js';
import { GLTF, GLTFLoader } from '../../vendor/three/examples/jsm/loaders/GLTFLoader.js';
import { Pathfinding, PathfindingHelper } from 'three-pathfinding';
import styles from './PathFinding.scss'

class PathFinding extends React.Component {
    pathFinder = () => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        const container = document.getElementById('pathFinding');
        
        const canvas = document.querySelector('canvas');
        if(canvas){
            canvas.remove();
        }

        const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);
    
        const loader = new GLTFLoader();

        const renderer = new THREE.WebGLRenderer({antialias:true});
        //renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.domElement.id = 'model';
        //document.body.appendChild(container);
        container.appendChild(renderer.domElement);

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
        // // controls.addEventListener('change', renderer);

        controls.screenSpacePanning = false;

        controls.minDistance = 100;
        controls.maxDistance = 5000;

        controls.maxPolarAngle = Math.PI / 2;
        controls.update()

        const hilight = new THREE.AmbientLight('white', 0.5);
        scene.add(hilight);
    
        const directionalLight = new THREE.DirectionalLight('white', 0.8);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        loader.load('src/vendor/models/model_caly.glb', (gltf) => {
            scene.add(gltf.scene);
        });

        const agentHeight = 10.0;
        const agentRadius = 4;
        const agent = new THREE.Mesh(new THREE.CylinderGeometry(agentRadius, agentRadius,agentHeight), 
            new THREE.MeshPhongMaterial({color: 'green'}));
        agent.position.y = agentHeight / 2;
        const agentGroup = new THREE.Group();
        agentGroup.add(agent);
        agentGroup.position.x = 10;
        agentGroup.position.z = 0;
        agentGroup.position.y = 0;
        scene.add(agentGroup);

        const pathFinding = new Pathfinding()
        const pathFindingHelper = new PathfindingHelper()
        scene.add(pathFindingHelper);
        const ZONE = 'level1';
        let navmesh;
        let groupId;
        let navpath;

        loader.load('src/vendor/models/Segmented_mesh.glb', (gltf) => {
            gltf.scene.traverse( node => {
                if (!navmesh && node.isObject3D && node.children && node.children.length > 0){
                    navmesh = node.children[0];
                    pathFinding.setZoneData(ZONE, Pathfinding.createZone(navmesh.geometry));
                }
            })
        });

        const rayCaster = new THREE.Raycaster();
        const clickMouse = new THREE.Vector2();
        container.childNodes[1].addEventListener('click', event => {
            console.log(window.innerHeight)
            console.log(event.clientY, container.clientHeight);
            console.log(-(event.clientY / (container.clientHeight - 100)) * 2 + 1.3)
            clickMouse.x = ((event.clientX - window.innerWidth * 0.15) / container.clientWidth) * 2 - 1;
            clickMouse.y = -(event.clientY / (container.clientHeight - 100)) * 2 + 1.3;
            rayCaster.setFromCamera(clickMouse, camera);
            const found = rayCaster.intersectObjects(scene.children);

            if (found.length > 0) {
                let target = found[0].point;
                groupId = pathFinding.getGroup(ZONE, agentGroup.position)
                const closest = pathFinding.getClosestNode(agentGroup.position, ZONE, groupId);
                navpath = pathFinding.findPath(closest.centroid, target, ZONE, groupId);
                
                if (navpath) {
                    pathFindingHelper.reset();
                    pathFindingHelper.setPlayerPosition(agentGroup.position);
                    pathFindingHelper.setTargetPosition(target);
                    pathFindingHelper.setPath(navpath);
                }
            }
        })
        
        function move(delta) {
            if (!navpath || navpath.length <= 0) return;

            let targetPosition = navpath[0];
            const distance = targetPosition.clone().sub(agentGroup.position);
            if (distance.lengthSq() > 0.5 * 1) {
                distance.normalize();
                agentGroup.position.add(distance.multiplyScalar(delta * 50));
            } else {
                navpath.shift();
            }
        }

        let animationLoop = null;
        renderer.dispose();
        const clock = new THREE.Clock()
        function animate() {
            move(clock.getDelta())
            if(animationLoop){
                cancelAnimationFrame(animationLoop)
            }
            animationLoop = requestAnimationFrame(() => animate());

            renderer.clear();
            // controls.update();
            renderer.render(scene, camera);
        }

        const stopAnimatioLoop = () => {
            cancelAnimationFrame(animationLoop);
            console.log('it works!');
        }
        animate();

        const buttons = document.getElementById('pathFinding').querySelectorAll('a');
        buttons.forEach(element => {
            element.addEventListener('click', () => {
                stopAnimatioLoop();
            });
        });
    }

    render() {
        return (
            <div id = 'pathFinding' className = {styles.component}>
                <a onClick = {(e) => this.pathFinder()}>View</a>
            </div>
        )
    }
}

export default PathFinding