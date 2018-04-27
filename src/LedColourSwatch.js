import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LedColourSwatch extends Component {

  render() {
    const ledColourSwatchStyle = {
      width: '27px',
      height: '27px',
      border: '1px solid #aaaaaa',
      position: 'absolute',
      top: '35px',
    };

    let ledColourHexRed = this.props.ledColourRed.toString(16);
    if (ledColourHexRed.length === 1) ledColourHexRed = '0' + ledColourHexRed;
    let ledColourHexGreen = this.props.ledColourGreen.toString(16);
    if (ledColourHexGreen.length === 1) ledColourHexGreen = '0' + ledColourHexGreen;
    let ledColourHexBlue = this.props.ledColourBlue.toString(16);
    if (ledColourHexBlue.length === 1) ledColourHexBlue = '0' + ledColourHexBlue;

    const ledColourHex = '#' + ledColourHexRed + ledColourHexGreen + ledColourHexBlue;

    ledColourSwatchStyle.backgroundColor = ledColourHex;

    return (
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
      }}>
        <p style={{
          color: 'rgba(0,0,0,0.3)',
          lineHeight: '12px',
          margin: 0,
          position: 'absolute',
          top: '20px',
        }}>Colour</p>
        <div
          style={ledColourSwatchStyle}
          onClick={this.props.onSwatchClicked}
        />
      </div>
    );
  }
};

LedColourSwatch.propTypes = {
  ledColourRed: PropTypes.number,
  ledColourGreen: PropTypes.number,
  ledColourBlue: PropTypes.number,
  onSwatchClicked: PropTypes.func,
};

export default LedColourSwatch;
