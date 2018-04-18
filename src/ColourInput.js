import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class ColourInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      red: props.red,
      green: props.green,
      blue: props.blue,
    }
  }

  handleLedColourChanged = (evt, value) => {
    let colourValue = 0;
    if (value >= 1 && value < 256) {
      colourValue = parseInt(value);
    }
    if (evt.target.id === 'ledRed') {
      this.setState({red: colourValue});
    } else if (evt.target.id === 'ledGreen') {
      this.setState({green: colourValue});
    } else if (evt.target.id === 'ledBlue') {
      this.setState({blue: colourValue});
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleDialogClose}
      />,
      <FlatButton
        label="Update colour"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.props.handleColourUpdate(
            this.state.red,
            this.state.green,
            this.state.blue,
          );
          this.props.handleDialogClose();
        }}
      />,
    ];

    return (
      <Dialog
        title="LED Colour"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.props.handleDialogClose}
      >
        <div>
          <TextField
            id="ledRed"
            type="number"
            floatingLabelText="Red"
            value={this.state.red}
            onChange={this.handleLedColourChanged}
          />
          <TextField
            id="ledGreen"
            type="number"
            floatingLabelText="Green"
            value={this.state.green}
            onChange={this.handleLedColourChanged}
          />
          <TextField
            id="ledBlue"
            type="number"
            floatingLabelText="Blue"
            value={this.state.blue}
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
  handleDialogClose: PropTypes.func.isRequired,
  handleColourUpdate: PropTypes.func.isRequired,
};

export default ColourInput;
