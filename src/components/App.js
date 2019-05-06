import React, { Component } from "react";
import Preview from "./Preview";
import Speed from "./Speed";
import Timer from "./Timer";
import End from "./End";

const initialState = {
  text: "",
  userInput: "",
  symbols: 0,
  sec: 0,
  started: false,
  finished: false,
  timer: 0
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    fetch("https://www.randomtext.me/api/gibberish/p-1/20-35/")
      .then(res => res.json())
      .then(data => {
        const content = data.text_out;
        let htmlRemovedContent = content.replace("<p>", "");
        htmlRemovedContent = htmlRemovedContent.replace("</p>", "").trim();
        this.setState({ text: htmlRemovedContent });
      });
  };

  onRestart = () => {
    this.setState(initialState);
    clearInterval(this.interval);
    this.fetchApi();
  };

  onUserInputChange = e => {
    const input = e.target.value;
    this.setTimer();
    this.onFinish(input);
    this.setState({
      userInput: input,
      symbols: this.countCorrectSymbols(input)
    });
  };

  countCorrectSymbols(userInput) {
    const text = this.state.text.replace(" ", "");
    return userInput
      .replace(" ", "")
      .split("")
      .filter((s, i) => s === text[i]).length;
  }

  setTimer() {
    if (!this.state.started) {
      this.setState({ started: true });
      this.interval = setInterval(() => {
        this.setState(prev => {
          return { sec: prev.sec + 1 };
        });
      }, 1000);
    }
  }

  onFinish(userInput) {
    if (userInput === this.state.text) {
      clearInterval(this.interval);
      this.setState({ finished: true });
    }
  }

  render() {
    return (
      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col mx-auto">
            <nav className="navbar navbar-light mb-3">
              <h2 className="mx-auto">TypeRacer</h2>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Preview text={this.state.text} userInput={this.state.userInput} />
            <textarea
              className="form-control mb-3"
              placeholder="Start Typing..."
              value={this.state.userInput}
              onChange={this.onUserInputChange}
              readOnly={this.state.finished}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="row">
              <div className="col-md-4">
                <Speed sec={this.state.sec} symbols={this.state.symbols} />
              </div>
              <div className="col-md-4">
                {this.state.started && <Timer finished={this.state.finished} />}
              </div>
              <div className="col-md-4">
                <div className="text-right">
                  <button className="btn btn-light" onClick={this.onRestart}>
                    Restart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.finished && <End />}
      </div>
    );
  }
}

export default App;
