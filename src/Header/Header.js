import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  shMenu(){
    
  }

  render() {
    return (
      <header>
        <div className="logoDiv">
          <img className="redditLogo" src={require('./RedditLogo.svg')} />
          <a className="headerTitle">Reddit Quizer</a>
        </div>
        <img className="menu" src={require('./Menu.svg')} onClick={this.shMenu()} />
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
