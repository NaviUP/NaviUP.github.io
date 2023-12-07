import React from 'react';
import styles from './HUD.scss';
import Hero from '../Hero/Hero';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { pageContents, heroData } from '../../data/dataStore';
import Model from '../Model/Model';

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
  </div>
);

export default HUD;