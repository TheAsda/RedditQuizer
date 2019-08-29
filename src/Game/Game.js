import React from 'react';
import Block from './Block';
import WaveLoading from '@bit/akameco.styled-spinkit.wave-loading';
import '../style/Game.css';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Line from './Line';

export default class extends React.Component {
  state = { questions: null, score: 0, timeout: false };

  componentWillMount() {
    const url = process.env.REACT_APP_IP + '/getPosts';
    fetch(url)
      .then(res =>
        res.json().then(res => {
          this.setState({ questions: res });
        })
      )
      .catch(err => this.setState({ timeout: true }));
  }

  render() {
    if (this.state.timeout) {
      return <h3 className="error">Request timed out</h3>;
    }
    if (this.state.questions == null)
      return (
        <div className="game">
          <WaveLoading color="#1f2b6c" size={200} />
        </div>
      );
    else {
      const answers = [];
      const questions = [];
      this.state.questions.forEach(question => {
        questions.push(<Block id={question.id}>{{ data: question.question, type: 'question' }}</Block>);
        answers.push(<Block id={question.id}>{{ data: question.answers, type: 'answer' }}</Block>);
      });
      questions.sort(() => 0.5 - Math.random());
      answers.sort(() => 0.5 - Math.random());
      return (
        <Provider store={Store} className="game">
          <div className="score">
            <h3 className="scoreText">{'Score: ' + this.state.score}</h3>
          </div>
          <div className="gameBoard">
            <div className="questions">{questions}</div>
            <div className="center">
              <button className="submit">Submit</button>
            </div>
            <div className="answers">{answers}</div>
          </div>
        </Provider>
      );
    }
  }
}
