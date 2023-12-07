import React from "react";
import styles from './Project.scss';
import Tile from "../Tile/Tile";
import ReactHtmlParser from 'react-html-parser';
import { projectData } from "../../data/dataStore";

const Project = () => (
    <Tile>
        <div className = {styles.component}>
            <h1>{ReactHtmlParser(projectData.title)}</h1>   
            <h4>{ReactHtmlParser(projectData.paragraphs.h4)}</h4>
            <p>{ReactHtmlParser(projectData.paragraphs.p1)}</p>
            <p>{ReactHtmlParser(projectData.paragraphs.p2)}</p>
            <p>{ReactHtmlParser(projectData.paragraphs.p3)}</p>
            <div>
                <a href = {projectData.konkursLink} target="_blank">{ReactHtmlParser(projectData.konkursText)}</a>
                <i className="fa-solid fa-sack-dollar"></i>
            </div>
            <div>
                <img src = {projectData.image} alt="logo upwr" />
            </div>        
        </div>
    </Tile>
);

export default Project;