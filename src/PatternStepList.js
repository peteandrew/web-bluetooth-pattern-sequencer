import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem} from 'material-ui/List';


const renderStepListItem = (step, idx) => {
  let stepType = '';
  switch (step[0]) {
    case 0x01:
      stepType = 'Clear display';
      break
    case 0x02:
      stepType = 'Single LED value';
      break;
    case 0x03:
      stepType = 'Delay';
      break;
    case 0x04:
      stepType = 'All LEDs value';
      break;
    default:
      break;
  }

  const itemKey = `step${idx+1}`;
  const itemText = `${idx+1}. ${stepType}`;

  return (<ListItem key={itemKey} primaryText={itemText} />);
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
