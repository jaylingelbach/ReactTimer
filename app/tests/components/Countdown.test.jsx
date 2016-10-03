var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Countdown = require('Countdown');

describe('Countdown', () => {
  it('should exist', ()=> {
    expect('Countdown').toExist();
  });

  describe('handleSetCountdown', ()=> {
    //check countDownStatus and countState get updated and decreminted by 1
    //done is added as a arg for mocha to know you are running an asynchronous test
    it('should set state to started and countdown', (done) => {
      //render and call
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(10);

      // status and count updated?
      expect(countdown.state.count).toBe(10);
      expect(countdown.state.countdownStatus).toBe('started');


      //asynchronous see above for working with mocha.
      setTimeout(() => {
        expect(countdown.state.count).toBe(9);
        done();
      }, 1001)
    });
    //test to make sure never gets set to negative number
    it('should never set count to less than zero', (done) => {
      //render and call
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(1);

      //asynchronous see above for working with mocha.
      setTimeout(() => {
        expect(countdown.state.count).toBe(0);
        done();
      }, 3001)
    });
    //checking paused state and function
    it('should pause countdown on paused status', (done) => {
       var countdown = TestUtils.renderIntoDocument(<Countdown/>);
       countdown.handleSetCountdown(3);
       countdown.handleStatusChange('paused');

       setTimeout(() => {
         expect(countdown.state.count).toBe(3);
         expect(countdown.state.countdownStatus).toBe('paused');
         done();
       }, 1001);
     });

     it('should reset count on stopped', (done) => {
       var countdown = TestUtils.renderIntoDocument(<Countdown/>);
       countdown.handleSetCountdown(3);
       countdown.handleStatusChange('stopped');

       setTimeout(() => {
         expect(countdown.state.count).toBe(0);
         expect(countdown.state.countdownStatus).toBe('stopped');
         done();
       }, 1001);
     });
  });
});
