import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Homepage.css';

export default class extends React.Component {
  render() {
    return (
      <div className="homepage">
        <h1 className="title">Reddit Quizer</h1>
        <h2 className="description">
          Here you can play a game where you have to match questions and top answers from /r/AskReddit.
        </h2>
        <h3 className="rules">
          Rules: You have questions on the left and answers on the right. You can select a question and an answer to check your assumption. For each right answer you will receive a point, for each wrong answer lose a point. Reset button just updates questions.
        </h3>
        <Link to="/game" className="startButton">
          Start
        </Link>
      </div>
    );
  }
}
