var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
  getInitialState: function() {
    return {count: 0};
  },
  // called when form submitted with valid data. Passed with new number of seconds.
  // this is how Countdown (maintains state)- interacts with form.

  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds
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
