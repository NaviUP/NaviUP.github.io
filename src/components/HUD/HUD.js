import React from 'react';
import styles from './HUD.scss';
import Hero from '../Hero/Hero';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { pageContents, heroData } from '../../data/dataStore';
import Model from '../Model/Model';
import Map from '../Map/Map';

// class HUD extends React.Component {
//   render() {
//     return (
//       <main className = {styles.component}>
//         <Hero {...heroData} />
//         <Menu links = {pageContents.menu} />
//         <Login />
//         <Footer title = {pageContents.footer} />
//       </main>
//     )
//   }
// }

const HUD = ({children}) => (
  <div>
    <Hero {...heroData} />
    <Menu links = {pageContents.menu}  />
    <Login />
    <Footer title = {pageContents.footer} />
    {children}
    <Model />
    <Map />
  </div>
);

export default HUD;