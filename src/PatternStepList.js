import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from 'material-ui/List';


const renderStepListItem = (step, idx) => {
  let stepType = '';
  let stepParams = '';
  switch (step[0]) {
    case 0x01:
      stepType = 'Clear display';
      break
    case 0x02:
      stepType = 'Single LED value';
      stepParams = `LED: ${step[1]}, Red: ${step[2]}, Green: ${step[3]}, Blue: ${step[4]}`;
      break;
    case 0x03:
      stepType = 'Delay';
      stepParams = `Count: ${step[1]}`;
      break;
    case 0x04:
      stepType = 'All LEDs value';
      stepParams = `Red: ${step[1]}, Green: ${step[2]}, Blue: ${step[3]}`;
      break;
    default:
      break;
  }

  const itemKey = `step${idx+1}`;
  const itemText = `${idx+1}. ${stepType}`;

  return (<ListItem key={itemKey} primaryText={itemText} secondaryText={stepParams} />);
}

const PatternStepList = (props) => {

  const { pattern } = props;

  return (
    <List>
      {pattern.map((step, idx) => renderStepListItem(step, idx))}
    </List>
  );
};

PatternStepList.propTypes = {
  pattern: PropTypes.array.isRequired,
};

export default PatternStepList;
