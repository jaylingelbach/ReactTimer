var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var CountdownForm = require('CountdownForm');

//should always be the first test to run. Easy to check if it works on the most basic level.
describe('CountdownForm', () => {
  it('should exist', () => {
    expect(CountdownForm).toExist();
  });
  //spy test
  it('should call onSetCountdown if valid seconds entered', () => {
    //create spy
    var spy = expect.createSpy();
    //render CountdownForm component
    var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>)
    var $el = $(ReactDOM.findDOMNode(countdownForm));

    //manipulate value in input field
    countdownForm.refs.seconds.value = '109';
    //simulate submit - with the DOM node passed in. From the child form- and the first dom node [0]
    TestUtils.Simulate.submit($el.find('form')[0]);
    // make sure it has been called.
    // 109 comes from onSetCountdown- that now contains 109 from ref.seconds.value
    expect(spy).toHaveBeenCalledWith(109);
  });

  it('should not call onSetCountdown if invalid seconds entered', () => {
    //create spy
    var spy = expect.createSpy();
    //render CountdownForm component
    var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>)
    var $el = $(ReactDOM.findDOMNode(countdownForm));

    //manipulate value in input field
    countdownForm.refs.seconds.value = '109a';
    //simulate submit - with the DOM node passed in. From the child form- and the first dom node [0]
    TestUtils.Simulate.submit($el.find('form')[0]);
    // make sure it has been called.
    // 109 comes from onSetCountdown- that now contains 109 from ref.seconds.value
    expect(spy).toNotHaveBeenCalled();
  });

});
