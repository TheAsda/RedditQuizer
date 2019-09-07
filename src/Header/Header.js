import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  render() {
    return (
      <header>
        <div className="logoDiv">
          <img className="redditLogo" src={require('./RedditLogo.svg')} alt="logo"/>
          <h1 className="headerTitle">Reddit Quizer</h1>
        </div>
        <img className="menu" src={require('./Menu.svg')} alt="menu"/>
        <div className="buttonDiv">
          <Link to="/" className="headerButton">
            HOME
          </Link>
          <Link to="/game" className="headerButton">
            GAME
          </Link>
          <Link to="/about" className="headerButton">
            ABOUT
          </Link>
        </div>
      </header>
    );
  }
}
