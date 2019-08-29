import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Homepage.css';

export default class extends React.Component {
  render() {
    return (
      <div className="homepage">
        <h1 className="title">Reddit Quizer</h1>
        <h2 className="description">
          Here you can play the game where you have to match questions and answers from /r/AskReddit.
        </h2>
        <h3 className="rules">
          Rules: You have questions on the left and answers on the right. Connect them via lines. If you
          have a hard time matching them you can get a few more answers by clicking the button below an
          answer.
        </h3>
        <Link to="/game" className="startButton">
          Start
        </Link>
      </div>
    );
  }
}
