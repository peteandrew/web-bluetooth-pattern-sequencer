import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


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

  handleAddStep = () => {
    switch (this.state.stepType) {
      case 'clear':
        this.props.handleAddStepClearDisplay(null);
        break;
      case 'single_led':
        this.props.handleAddStepSingleLedValue(
          null,
          this.props.selectedLed,
          100,
          50,
          20
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
          25,
          50,
          80
        );
        break;
    }
  }

  render() {
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
  selectedLed: PropTypes.number.isRequired,
};

export default PatternEditControls;
