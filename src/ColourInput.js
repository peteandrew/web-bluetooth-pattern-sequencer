import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ColourInput extends Component {

  handleLedColourChanged = (evt, value) => {
    let colourValue = 0;
    if (value >= 1 && value < 256) {
      colourValue = parseInt(value);
    }
    // if (evt.target.id === 'ledRed') {
    //   this.props.handleLedColourChanged(colourValue, null, null);
    // } else if (evt.target.id === 'ledGreen') {
    //   this.props.handleLedColourChanged(null, colourValue, null);
    // } else if (evt.target.id === 'ledBlue') {
    //   this.props.handleLedColourChanged(null, null, colourValue);
    // }
  }

  handleClose = () => {
    console.log('close');
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Update colour"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        title="LED Colour"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
      >
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
      </Dialog>
    );
  }
};

ColourInput.propTypes = {
  red: PropTypes.number.isRequired,
  green: PropTypes.number.isRequired,
  blue: PropTypes.number.isRequired,
};

export default ColourInput;
