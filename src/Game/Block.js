import React from 'react';
import '../style/Block.css';
import { setCurrent, addScore, decreaseScore } from './Redux/Actions';
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
    const thisID = this.props.id;
    const storeID = Store.getState().current;

    if (storeID === '') {
      document.getElementById(thisID).classList.add('active');
      Store.dispatch(setCurrent(thisID));
      return;
    }

    if (thisID === storeID) {
      document.getElementById(thisID).classList.remove('active');
      Store.dispatch(setCurrent(''));
      return;
    }

    const storeData = Store.getState().answers;
    let qf = [false, false],
      af = [false, false];
    storeData.forEach(answer => {
      if (thisID === answer.questionID) qf[0] = true;
      if (storeID === answer.questionID) qf[1] = true;
      if (thisID === answer.answerID) af[0] = true;
      if (storeID === answer.answerID) af[1] = true;
    });
    if ((qf[0] === true && qf[1] === true) || (af[0] === true && af[1] === true)) {
      document.getElementById(storeID).classList.remove('active');
      document.getElementById(thisID).classList.add('active');
      Store.dispatch(setCurrent(thisID));
      return;
    }
    let f = false;
    storeData.forEach(answer => {
      if (
        (answer.questionID === thisID && answer.answerID === storeID) ||
        (answer.answerID === thisID && answer.questionID === storeID)
      ) {
        f = true;
      }
    });

    if (f === true) {
      document.getElementById(storeID).classList.remove('active');
      document.getElementById(storeID).classList.add('right');
      document.getElementById(thisID).classList.add('right');
      Store.dispatch(setCurrent(''));
      Store.dispatch(addScore());
    } else {
      document.getElementById(storeID).classList.remove('active');
      document.getElementById(storeID).classList.add('wrong');
      document.getElementById(thisID).classList.add('wrong');
      Store.dispatch(setCurrent(''));
      Store.dispatch(decreaseScore());

      setTimeout(() => {
        document.getElementById(storeID).classList.remove('wrong');
        document.getElementById(thisID).classList.remove('wrong');
      }, 500);
    }
  }

  render() {
    if (this.props.children.type === 'question')
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
      return (
        <div
          id={this.props.id}
          className={this.state.active === false ? 'block' : 'block active'}
          onClick={() => this.onClickAction()}
        >
          <h3 className="blockText">{this.props.children.data[0]}</h3>
        </div>
      );
    }
  }
}
