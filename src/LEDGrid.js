import React from 'react';
import PropTypes from 'prop-types';


const LEDGrid = (props) => {

  const { pattern } = props;

  const gridCells = [];
  for (let row = 1; row <= props.height; row++) {
    for (let col = 1; col <= props.width; col++) {
      const key = `row${row}col${col}`;
      gridCells.push((<div key={key} style={{gridColumn: col, gridRow: row, border: '1px solid black'}}></div>));
    }
  }

  return (
    <div style={{display: 'grid', width: '100%', gridGap: '10px'}}>
      {gridCells.map(cell => cell)}
    </div>
  );
};

LEDGrid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

LEDGrid.defaultProps = {
  width: 8,
  height: 8,
}

export default LEDGrid;
