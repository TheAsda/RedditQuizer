import React from 'react';
import Store from './Redux/Store';

export default class extends React.Component {
  constructor() {
    super();
    this.state = { score: Store.getState().score };
    Store.subscribe(() =>
      Store.getState().score !== this.state.score ? this.setState({ score: Store.getState().score }) : ''
    );
  }
  render() {
    return (
      <div className="score">
        <h3 className="scoreText">{'Score: ' + this.state.score}</h3>
      </div>
    );
  }
}
