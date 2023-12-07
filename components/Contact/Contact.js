import React from "react";
import styles from './Contact.scss';
import Tile from "../Tile/Tile";
import { contactData } from "../../data/dataStore";

const Contact = () => (
    <Tile>
        <div className = {styles.component} style={{maxHeight: '650px'}}>
            <h2>{contactData.header}</h2>
            <p><strong><i className="fa-solid fa-envelope"></i></strong>{contactData.basicInfo.mail}</p>
            <p><i className="fa-solid fa-location-dot"></i>{contactData.basicInfo.address}</p>
            <h2><strong>{contactData.people[0].role}</strong></h2>
            <h3>{contactData.people[0].name}</h3>
            <p><strong><i className="fa-solid fa-envelope"></i></strong>{contactData.people[0].mail}</p>
            <p><strong><i className="fa-solid fa-phone"></i></strong>{contactData.people[0].phone}</p>
            <h2><strong>{contactData.people[1].role}</strong></h2>
            <h3>{contactData.people[1].name}</h3>
            <p><strong><i className="fa-solid fa-envelope"></i></strong>{contactData.people[1].mail}</p>
            <p><strong><i className="fa-solid fa-phone"></i></strong>{contactData.people[1].phone}</p>
            <h2><strong>{contactData.people[2].role}</strong></h2>
            <h3>{contactData.people[2].name}</h3>
            <p><strong><i className="fa-solid fa-envelope"></i></strong>{contactData.people[2].mail}</p>
        </div>
    </Tile>
);

export default Contact;