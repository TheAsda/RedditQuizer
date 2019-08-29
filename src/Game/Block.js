import React from 'react';
import '../style/Block.css';
import { setCurrent } from './Redux/Actions';
import Store from './Redux/Store';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
    this.onClickAction = this.onClickAction.bind(this);
  }

  onClickAction() {
    if (this.state.active === false) Store.dispatch(setCurrent(this.props.id));
    else Store.dispatch(setCurrent(''));
    this.setState({ active: !this.state.active });
  }

  render() {
    if (this.props.children.type == 'question')
      return (
        <div
          id={this.props.id}
          className={this.state.active === false ? 'block' : 'block active'}
          onClick={() => this.onClickAction()}
        >
          <h3 className="blockText">{this.props.children.data}</h3>
        </div>
      );
    else {
      const answers = [];
      for (let i = 0; i < 3; i++) {
        answers.push(
          <h3 className="blockText" style={i !== 0 ? { display: 'none' } : { display: 'block' }}>
            {this.props.children.data[i]}
          </h3>
        );
      }
      return (
        <div
          id={this.props.id}
          className={this.state.active === false ? 'block' : 'block active'}
          onClick={() => this.onClickAction()}
        >
          {answers}
        </div>
      );
    }
  }
}
