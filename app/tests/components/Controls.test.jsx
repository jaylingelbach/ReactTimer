var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe('Controls', () => {
  it('should exist', ()=> {
    expect(Controls).toExist();
  });

  describe('render', () => {
    it('should render pause when started', () => {
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus = 'started'/>);
      var $el = $(ReactDOM.findDOMNode(controls));

      //search for button
      var $pauseButton = $el.find('button:contains(Pause)');
      //1 denotes the number to be found. We expect 1 pause button
      expect($pauseButton.length).toBe(1);
    });
  });

  describe('render', () => {
    it('should render start when paused', () => {
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus = 'paused'/>);
      var $el = $(ReactDOM.findDOMNode(controls));

      //search for button
      var $startButton = $el.find('button:contains(Start)');
      //1 denotes the number to be found. We expect 1 pause button
      expect($startButton.length).toBe(1);
    });
  });
});
