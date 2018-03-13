import React, { Component } from 'react';

import PatternStepList from './PatternStepList';
import LEDGrid from './LEDGrid';


const initialState = {
  pattern: [
    Uint8Array.of(0x01),
    Uint8Array.of(0x02, 0, 255, 0, 0),
    Uint8Array.of(0x03, 5),
    Uint8Array.of(0x02, 0, 0, 255, 0),
    Uint8Array.of(0x03, 5),
    Uint8Array.of(0x02, 0, 0, 0, 255),
    Uint8Array.of(0x03, 5),
  ],
  numBytes: 22,
};

class Pattern extends Component {
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
      <div>
        <PatternStepList
          pattern={this.state.pattern}
        />
        <LEDGrid />
      </div>
    );
  }
}

export default Pattern;
