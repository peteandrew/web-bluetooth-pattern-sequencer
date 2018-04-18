import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';

import PatternStepList from './PatternStepList';
import PatternEditControls from './PatternEditControls';
import LEDGrid from './LEDGrid';


const initialState = {
  pattern: [
    Uint8Array.of(0x01),
    Uint8Array.of(0x02, 0, 255, 0, 0),
    Uint8Array.of(0x03, 5),
    Uint8Array.of(0x02, 0, 0, 255, 0),
    Uint8Array.of(0x03, 5),
    Uint8Array.of(0x02, 0, 0, 0, 255),
    Uint8Array.of(0x03, 5),
  ],
  numBytes: 22,
  selectedLed: 0,
  displayedScreen: 'grid',
  drawerOpen: false,
};

class Pattern extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleClearPattern = this.handleClearPattern.bind(this);
    this.handleAddStepClearDisplay = this.handleAddStepClearDisplay.bind(this);
    this.handleAddStepSingleLedValue = this.handleAddStepSingleLedValue.bind(this);
    this.handleAddStepDelay = this.handleAddStepDelay.bind(this);
    this.handleAddStepAllLedValues = this.handleAddStepAllLedValues.bind(this);
    this.handleLedSelected = this.handleLedSelected.bind(this);
  }

  handleDrawerToggle() {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleClearPattern() {
    this.setState(initialState);
  }

  updateNumBytes() {
    this.setState(prevState => {
      let numBytes = 0;
      prevState.pattern.forEach(step => {
        numBytes += step.length;
      });
      return {
        ...prevState,
        numBytes,
      };
    })
  }

  addPatternStep(idx, newStep) {
    if (idx === 0) return;

    this.setState(prevState => {
      const newPattern = prevState.pattern.slice();

      if (!idx) {
        newPattern.push(newStep);
      } else {
        newPattern.splice(idx, 0, newStep);
      }

      return {
        ...prevState,
        pattern: newPattern,
      };
    });

    this.updateNumBytes();
  }

  handleAddStepClearDisplay(idx) {
    this.addPatternStep(idx, Uint8Array.of(0x01));
  }

  handleAddStepSingleLedValue(idx, ledNum, red, green, blue) {
    this.addPatternStep(idx, Uint8Array.of(0x02, ledNum, red, green, blue));
  }

  handleAddStepDelay(idx, delay) {
    this.addPatternStep(idx, Uint8Array.of(0x03, delay));
  }

  handleAddStepAllLedValues(idx, red, green, blue) {
    this.addPatternStep(idx, Uint8Array.of(0x04, red, green, blue));
  }

  handleRemoveStep(idx) {
    if (idx === 0) return;

    this.setState(prevState => {
      const newPattern = prevState.pattern.slice();
      newPattern.splice(idx, 1);
      return {
        ...prevState,
        pattern: newPattern,
      };
    });

    this.updateNumBytes();
  }

  handleLedSelected(ledNum) {
    this.setState(prevState => {
      return {
        ...prevState,
        selectedLed: ledNum,
      };
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title="Pattern Sequencer"
          onLeftIconButtonClick={this.handleDrawerToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={(open) => this.setState({drawerOpen: open})}
        >
          <AppBar
            title="Menu"
            onLeftIconButtonClick={this.handleDrawerToggle}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          />
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
        <Tabs>
          <Tab label="Grid">
            <div>
              <LEDGrid
                selectedLed={this.state.selectedLed}
                handleLedSelected={this.handleLedSelected}
              />
              <PatternEditControls
                handleClearPattern={this.handleClearPattern}
                handleAddStepClearDisplay={this.handleAddStepClearDisplay}
                handleAddStepSingleLedValue={this.handleAddStepSingleLedValue}
                handleAddStepDelay={this.handleAddStepDelay}
                handleAddStepAllLedValues={this.handleAddStepAllLedValues}
                handleLedSelected={this.handleLedSelected}
                handleLedColourChanged={this.handleLedColourChanged}
                selectedLed={this.state.selectedLed}
              />
            </div>
          </Tab>
          <Tab label="Step List">
            <div>
              <PatternStepList
                pattern={this.state.pattern}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Pattern;
