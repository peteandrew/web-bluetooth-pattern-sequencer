import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const initialState = {
  pattern: [
    Uint8Array.of(0x01),
  ],
  numBytes: 1,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClearPattern = this.handleClearPattern.bind(this);
    this.handleAddStepClearDisplay = this.handleAddStepClearDisplay.bind(this);
    this.handleAddStepSingleLedValue = this.handleAddStepSingleLedValue.bind(this);
    this.handleAddStepDelay = this.handleAddStepDelay.bind(this);
    this.handleAddStepAllLedValues = this.handleAddStepAllLedValues.bind(this);
  }

  handleClearPattern() {
    this.setState(initialState);
  }

  updateNumBytes() {
    this.setState(prevState => {
      let numBytes = 0;
      prevState.pattern.forEach(step => {
        numBytes += step.length;
      });
      return {
        ...prevState,
        numBytes,
      };
    })
  }

  addPatternStep(idx, newStep) {
    if (idx === 0) return;

    this.setState(prevState => {
      const newPattern = prevState.pattern.slice();

      if (!idx) {
        newPattern.push(newStep);
      } else {
        newPattern.splice(idx, 0, newStep);
      }

      return {
        ...prevState,
        pattern: newPattern,
      };
    });

    this.updateNumBytes();
  }

  handleAddStepClearDisplay(idx) {
    this.addPatternStep(idx, Uint8Array.of(0x01));
  }

  handleAddStepSingleLedValue(idx, ledNum, red, green, blue) {
    this.addPatternStep(idx, Uint8Array.of(0x02, ledNum, red, green, blue));
  }

  handleAddStepDelay(idx, delay) {
    this.addPatternStep(idx, Uint8Array.of(0x03, delay));
  }

  handleAddStepAllLedValues(idx, red, green, blue) {
    this.addPatternStep(idx, Uint8Array.of(0x04, red, green, blue));
  }

  handleRemoveStep(idx) {
    if (idx === 0) return;

    this.setState(prevState => {
      const newPattern = prevState.pattern.slice();
      newPattern.splice(idx, 1);
      return {
        ...prevState,
        pattern: newPattern,
      };
    });

    this.updateNumBytes();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
