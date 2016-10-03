var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  //part of React is a component life cycle method. We use this to keep track of the countDownStatus
  //gets called after props or state update. passed two args. previous props and previous state.

  // check just after update happens
  componentDidUpdate: function (prevProps, prevState) {
      if (this.state.countdownStatus !== prevState.countdownStatus) {
        switch (this.state.countdownStatus) {
          case 'started':
            this.startTimer();
            break;
          case 'stopped':
            this.setState({count: 0});
          case 'paused':
            clearInterval(this.timer)
            this.timer = undefined;
            break;
        }
      }
    },
    componentWillUnmount: function () {
      console.log('componentDidUnmount');
      this.timer = undefined;
    },
  //first arg setInterval second is the time in ms.
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
      if(newCount === 0) {
        this.setState({countdownStatus: 'stopped'});
      }
    }, 1000);
  },
  // called when form submitted with valid data. Passed with new number of seconds.
  // this is how Countdown (maintains state)- interacts with form.
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  },
  handleStatusChange: function (newStatus) {
      this.setState({countdownStatus: newStatus});
    },
  render: function() {
    var {count, countdownStatus} = this.state;
    //dynamically render function to be passed below
    var renderControlArea = () => {
          if (countdownStatus !== 'stopped') {
            return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
          } else {
            return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
          }
        };
    return (
      <div>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    );
  }
});

module.exports= Countdown;
