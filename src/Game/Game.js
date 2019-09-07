import React from 'react';
import Block from './Block';
import WaveLoading from '@bit/akameco.styled-spinkit.wave-loading';
import '../style/Game.css';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { setCurrent, setAnswers } from './Redux/Actions';
import Score from './Score';

export default class extends React.Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.submit = this.submit.bind(this);
  }

  state = { questions: null, timeout: false, answers: null };

  async fetchData() {
    const url = process.env.REACT_APP_IP + '/getPosts';
    fetch(url)
      .then(res =>
        res.json().then(res => {
          const answers = [];
          const questions = [];
          const storeData = [];
          let i = parseInt(Math.random() * 10) + 10,
            j = parseInt(Math.random() * 10);
          res.forEach(question => {
            questions.push(
              <Block key={i} id={i}>
                {{ data: question.question, type: 'question' }}
              </Block>
            );
            answers.push(
              <Block key={j} id={j}>
                {{ data: question.answers, type: 'answer' }}
              </Block>
            );
            const element = { questionID: i, answerID: j };
            IDS: while (true) {
              i = parseInt(Math.random() < 0.8 ? i + Math.random() * 1000 : i - Math.random() * 1000);
              j = parseInt(Math.random() < 0.8 ? j + Math.random() * 1000 : j - Math.random() * 1000);
              if (i === j) continue;
              for (let z = 0; z < storeData.length; z++) {
                if (
                  storeData[z].questionID === i ||
                  storeData[z].questionID === j ||
                  storeData[z].answerID === i ||
                  storeData[z].answerID === j
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

          this.setState({ questions: questions, answers: answers });
        })
      )
      .catch(err => this.setState({ timeout: true }));
  }

  componentDidMount() {
    this.fetchData();
  }

  submit() {
    this.fetchData();
    this.setState({ questions: null });
  }

  UNSAFE_componentWillUpdate() {
    Store.dispatch(setCurrent(''));
    document.querySelectorAll('.active').forEach(elem => elem.classList.remove('active'));
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
      return (
        <Provider store={Store} className="game">
          <Score />
          <div className="gameBoard">
            <div className="questions">{this.state.questions}</div>
            <div className="center">
              <button className="centerButton" onClick={this.submit}>
                Reset
              </button>
            </div>
            <div className="answers">{this.state.answers}</div>
          </div>
        </Provider>
      );
    }
  }
}
