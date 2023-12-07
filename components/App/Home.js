import React from 'react';
import styles from './App.scss';
import List from '../List/List';
import Hero from '../Hero/Hero';
import Menu from '../Menu/Menu';
import Login from '../HUD/HUD';
import Footer from '../Footer/Footer';
import { pageContents, listData, heroData } from '../../data/dataStore';

class App extends React.Component {
  render() {
    return (
      <main className = {styles.component}>
        <Hero {...heroData} />
        <Menu links = {pageContents.menu} />
        <Login />
        <Footer title = {pageContents.footer} />
        {/* <List {...listData} /> */}
      </main>
    )
  }
}

export default App;
