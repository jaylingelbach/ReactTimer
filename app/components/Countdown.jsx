var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      countDownStatus: 'stopped'
    };
  },
  //part of React it is a component life cycle method. We use this to keep track of the countDownStatus
  //gets called after props or state update. passed two args. previous props and previous state.
  componentDidUpdate: function(prevProps, prevState) {
        if (this.state.countDownStatus != prevState.countDownStatus) {
          switch (this.state.countDownStatus) {
            case 'started' :
              this.startTimer();
              break;
      }
    }
  },
  //first arg setInterval second is the time in ms.
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count -1;
      this.setState({
        count: newCount >=0 ? newCount : 0
      });
    }, 1000);
  },
  // called when form submitted with valid data. Passed with new number of seconds.
  // this is how Countdown (maintains state)- interacts with form.
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countDownStatus: 'started'
    });
  },
  render: function() {
    var {count} = this.state;

    return (
      <div>
        <Clock totalSeconds={count}/>
        <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      </div>
    )
  }
});

module.exports= Countdown;
