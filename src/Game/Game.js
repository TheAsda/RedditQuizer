import React from 'react';
import Block from './Block';
import WaveLoading from '@bit/akameco.styled-spinkit.wave-loading';
import '../style/Game.css';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { setAnswers } from './Redux/Actions';
import Score from './Score';

export default class extends React.Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.submit = this.submit.bind(this);
  }

  state = { questions: null, timeout: false };

  async fetchData() {
    const url = process.env.REACT_APP_IP + '/getPosts';
    fetch(url)
      .then(res =>
        res.json().then(res => {
          this.setState({ questions: res });
        })
      )
      .catch(err => this.setState({ timeout: true }));
  }

  componentWillMount() {
    this.fetchData();
  }

  submit() {
    this.fetchData();
    this.setState({ questions: null });
  }

  render() {
    if (this.state.timeout) {
      return <h3 className="error">Error: request timed out</h3>;
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
      const storeData = [];
      let i = parseInt(Math.random() * 10) + 10,
        j = parseInt(Math.random() * 10);
      this.state.questions.forEach(question => {
        questions.push(<Block id={i}>{{ data: question.question, type: 'question' }}</Block>);
        answers.push(<Block id={j}>{{ data: question.answers, type: 'answer' }}</Block>);
        const element = { questionID: i, answerID: j };
        IDS: while (true) {
          i = parseInt(Math.random() < 0.8 ? i + Math.random() * 1000 : i - Math.random() * 1000);
          j = parseInt(Math.random() < 0.8 ? j + Math.random() * 1000 : j - Math.random() * 1000);
          if (i === j) continue;
          for (let elem in storeData) {
            if (
              elem.questionID === i ||
              elem.questionID === j ||
              elem.answerID === i ||
              elem.answerID === j
            )
              continue IDS;
          }
          break;
        }
        storeData.push(element);
      });
      Store.dispatch(setAnswers(storeData));

      questions.sort(() => 0.5 - Math.random());
      answers.sort(() => 0.5 - Math.random());

      return (
        <Provider store={Store} className="game">
          <Score />
          <div className="gameBoard">
            <div className="questions">{questions}</div>
            <div className="center">
              <button className="centerButton" onClick={this.submit}>
                Reset
              </button>
            </div>
            <div className="answers">{answers}</div>
          </div>
        </Provider>
      );
    }
  }
}
