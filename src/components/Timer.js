import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.finished === true) {
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prev => {
        return { timer: prev.timer + 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <p>
          {this.state.timer} {this.state.timer === 1 ? "second" : "seconds"}
        </p>
      </div>
    );
  }
}

export default Timer;
