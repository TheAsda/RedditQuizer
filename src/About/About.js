import React from 'react';
import '../style/Homepage.css';
import '../style/About.css';

export default class extends React.Component {
  constructor() {
    super();
    this.state = { sent: false };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    if (name === '' || message === '') {
      document.getElementById('wrongData').classList.add('show');
      setTimeout(() => {
        document.getElementById('wrongData').classList.remove('show');
      }, 1200);
      return;
    }
    const data = { name, message };
    const xhr = new XMLHttpRequest();
    const url = process.env.REACT_APP_IP + '/sendForm';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    document.getElementById('form').classList.add('disappear');
    setTimeout(() => {
      this.setState({ sent: true });
    }, 900);
  }

  render() {
    return (
      <div className="about">
        <div className="description">
          You can send some suggestions, feedback or just random text via the form down below.
        </div>
        {this.state.sent === false ? (
          <div className="form" id="form">
            <input type="text" id="name" placeholder="Name" />
            <textarea type="textarea" id="message" placeholder="Message" />
            <button className="submit" onClick={this.submitForm}>
              Submit
            </button>
            <h3 id="wrongData">Wrong data!</h3>
          </div>
        ) : (
          <div className="form appear" id="form">
            <h2 className="thank">Thanks!</h2>
          </div>
        )}
        <div className="footer">
          <div className="linkBox">
            <img className="logo" src={require('./githubLogo.svg')} />
            <a href="https://github.com/TheAsda" className="link">
              <p>Github</p>
            </a>
          </div>
          <div className="linkBox">
            <div className="credit">
              Icons made by{' '}
              <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">
                Dave Gandy
              </a>{' '}
              from{' '}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
