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

    // { displayLedColour &&
    //   <div>
    //     <TextField
    //       id="ledRed"
    //       type="number"
    //       floatingLabelText="Red"
    //       value={this.props.red}
    //       onChange={this.handleLedColourChanged}
    //     />
    //     <TextField
    //       id="ledGreen"
    //       type="number"
    //       floatingLabelText="Green"
    //       value={this.props.green}
    //       onChange={this.handleLedColourChanged}
    //     />
    //     <TextField
    //       id="ledBlue"
    //       type="number"
    //       floatingLabelText="Blue"
    //       value={this.props.blue}
    //       onChange={this.handleLedColourChanged}
    //     />
    //   </div>
    // }

    return (
      <div style={{marginTop: '15px'}}>
        <div>
          <DropDownMenu
              value={this.state.stepType}
              onChange={this.handleStepTypeChange}
              style={{verticalAlign: 'bottom', minWidth: '50%'}}
              labelStyle={{paddingLeft: '10px'}}
              underlineStyle={{marginLeft: '10px'}}
          >
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
          <RaisedButton
              label="Add step"
              onClick={this.handleAddStep}
              style={{minWidth: '40%'}}
          />
        </div>
        <div>
          { displaySelectedLed &&
            <TextField
              type="number"
              floatingLabelText="LED number"
              value={this.props.selectedLed}
              onChange={this.handleSelectedLedChanged}
              style={{width: '40%', marginLeft: '10px'}}
            />
          }
          { displayLedColour &&
            <div style={{
                display: 'inline-block',
                width: '40%',
                fontSize: '12px',
                lineHeight: '24px',
                position: 'relative',
                fontFamily: 'Roboto, sans-serif',
                marginLeft: '25px',
                height: '72px',
                verticalAlign: 'top',
              }}
            >
              <p style={{
                  color: 'rgba(0,0,0,0.3)',
                  lineHeight: '12px',
                  margin: 0,
                  position: 'absolute',
                  top: '20px',
              }}>Colour</p>
              <div
                style={{
                    width: '27px',
                    height: '27px',
                    border: '1px solid #aaaaaa',
                    position: 'absolute',
                    top: '35px',
                }}
              />
            </div>
          }
        </div>
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
