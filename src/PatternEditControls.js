import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ColourInput from './ColourInput';


class PatternEditControls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stepType: 'clear',
      colourInputDisplayed: false,
      ledColourRed: 0,
      ledColourGreen: 0,
      ledColourBlue: 0,
    };
  }

  handleStepTypeChange = (evt, idx, value) =>
    this.setState({
      stepType: value,
    });

  handleColourSwatchClicked = () =>
    this.setState({
      colourInputDisplayed: true,
    });

  handleSelectedLedChanged = (evt, value) => {
    let ledNum = 0;
    if (value >= 1 && value < 65) {
      ledNum = parseInt(value);
    }
    this.props.handleLedSelected(ledNum);
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
          this.state.ledColourRed,
          this.state.ledColourGreen,
          this.state.ledColourBlue,
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
          this.state.ledColourRed,
          this.state.ledColourGreen,
          this.state.ledColourBlue,
        );
        break;
    }
  }

  render() {
    const displaySelectedLed = this.state.stepType === 'single_led';
    const displayLedColour = this.state.stepType === 'single_led' || this.state.stepType === 'all_leds';

    const ledColourSwatchStyle = {
      width: '27px',
      height: '27px',
      border: '1px solid #aaaaaa',
      position: 'absolute',
      top: '35px',
    };

    let ledColourHexRed = this.state.ledColourRed.toString(16);
    if (ledColourHexRed.length === 1) ledColourHexRed = '0' + ledColourHexRed;
    let ledColourHexGreen = this.state.ledColourGreen.toString(16);
    if (ledColourHexGreen.length === 1) ledColourHexGreen = '0' + ledColourHexGreen;
    let ledColourHexBlue = this.state.ledColourBlue.toString(16);
    if (ledColourHexBlue.length === 1) ledColourHexBlue = '0' + ledColourHexBlue;

    const ledColourHex = '#' + ledColourHexRed + ledColourHexGreen + ledColourHexBlue;

    ledColourSwatchStyle.backgroundColor = ledColourHex;

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
                style={ledColourSwatchStyle}
                onClick={this.handleColourSwatchClicked}
              />
            </div>
          }
        </div>
        { this.state.colourInputDisplayed &&
          <ColourInput
            red={this.state.ledColourRed}
            green={this.state.ledColourGreen}
            blue={this.state.ledColourBlue}
            handleDialogClose={()=>this.setState({
              colourInputDisplayed: false
            })}
            handleColourUpdate={(red, green, blue)=>this.setState({
              ledColourRed: red,
              ledColourGreen: green,
              ledColourBlue: blue,
            })}
          />
        }
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
  selectedLed: PropTypes.number.isRequired,
};

export default PatternEditControls;
