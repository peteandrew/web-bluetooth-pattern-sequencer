import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class PatternEditControls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stepType: 'clear',
    };
  }

  handleStepTypeChange = (evt, idx, value) =>
    this.setState({
      stepType: value,
    });

  handleSelectedLedChanged = (evt, value) => {
    let ledNum = 0;
    if (value >= 1 && value < 65) {
      ledNum = parseInt(value);
    }
    this.props.handleLedSelected(ledNum);
  }

  handleLedColourChanged = (evt, value) => {
    let colourValue = 0;
    if (value >= 1 && value < 256) {
      colourValue = parseInt(value);
    }
    if (evt.target.id === 'ledRed') {
      this.props.handleLedColourChanged(colourValue, null, null);
    } else if (evt.target.id === 'ledGreen') {
      this.props.handleLedColourChanged(null, colourValue, null);
    } else if (evt.target.id === 'ledBlue') {
      this.props.handleLedColourChanged(null, null, colourValue);
    }
  }

  handleAddStep = () => {
    switch (this.state.stepType) {
      case 'clear':
        this.props.handleAddStepClearDisplay(null);
        break;
      case 'single_led':
        this.props.handleAddStepSingleLedValue(
          null,
          this.props.selectedLed,
          this.props.red,
          this.props.green,
          this.props.blue,
        );
        break;
      case 'delay':
        this.props.handleAddStepDelay(
          null,
          5
        );
        break;
      case 'all_leds':
        this.props.handleAddStepAllLedValues(
          null,
          this.props.red,
          this.props.green,
          this.props.blue,
        );
        break;
    }
  }

  render() {
    const displaySelectedLed = this.state.stepType === 'single_led';
    const displayLedColour = this.state.stepType === 'single_led' || this.state.stepType === 'all_leds';

    return (
      <div>
        <DropDownMenu value={this.state.stepType} onChange={this.handleStepTypeChange}>
          <MenuItem
            primaryText="Clear Display Step"
            value="clear" />
          <MenuItem
            primaryText="Single LED Step"
            value="single_led" />
          <MenuItem
            primaryText="Delay Step"
            value="delay" />
          <MenuItem
            primaryText="All LEDs Step"
            value="all_leds" />
        </DropDownMenu>
        { displaySelectedLed &&
          <TextField
            type="number"
            floatingLabelText="LED number"
            value={this.props.selectedLed}
            onChange={this.handleSelectedLedChanged}
          />
        }
        { displayLedColour &&
          <div>
            <TextField
              id="ledRed"
              type="number"
              floatingLabelText="Red"
              value={this.props.red}
              onChange={this.handleLedColourChanged}
            />
            <TextField
              id="ledGreen"
              type="number"
              floatingLabelText="Green"
              value={this.props.green}
              onChange={this.handleLedColourChanged}
            />
            <TextField
              id="ledBlue"
              type="number"
              floatingLabelText="Blue"
              value={this.props.blue}
              onChange={this.handleLedColourChanged}
            />
          </div>
        }
        <RaisedButton label="Add step" onClick={this.handleAddStep} />
      </div>
    );
  }
};

PatternEditControls.propTypes = {
  handleAddStepClearDisplay: PropTypes.func.isRequired,
  handleAddStepSingleLedValue: PropTypes.func.isRequired,
  handleAddStepDelay: PropTypes.func.isRequired,
  handleAddStepAllLedValues: PropTypes.func.isRequired,
  handleLedSelected: PropTypes.func.isRequired,
  handleLedColourChanged: PropTypes.func.isRequired,
  selectedLed: PropTypes.number.isRequired,
  red: PropTypes.number.isRequired,
  green: PropTypes.number.isRequired,
  blue: PropTypes.number.isRequired,
};

export default PatternEditControls;
