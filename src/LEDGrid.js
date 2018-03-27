import React from 'react';
import PropTypes from 'prop-types';


const LEDGrid = (props) => {

  const { pattern, selectedLed } = props;

  const onCellClick = (ledNum) => {
    props.handleLedSelected(ledNum);
  }

  const gridCells = [];
  for (let row = 1; row <= props.height; row++) {
    for (let col = 1; col <= props.width; col++) {
      const ledNum = ((col-1) * 8) + row;
      const key = `led${ledNum}`;

      gridCells.push((
        <div
          key={key}
          style={
            {
              gridColumn: col,
              gridRow: row,
              border: ledNum === selectedLed ? '1px solid red' : '1px solid black',
              width: '35px',
              height: '35px'
            }
          }
          onClick={onCellClick.bind(this, ledNum)}
        >
        </div>
      ));
    }
  }

  return (
    <div style={{margin: '15px 0 0 5px', display: 'grid', gridGap: '5px'}}>
      {gridCells.map(cell => cell)}
    </div>
  );
};

LEDGrid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  selectedLed: PropTypes.number,
  handleLedSelected: PropTypes.func.isRequired,
};

LEDGrid.defaultProps = {
  width: 8,
  height: 8,
}

export default LEDGrid;
