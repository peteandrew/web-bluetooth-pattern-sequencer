import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Pattern from './Pattern';


const App = () => (
  <MuiThemeProvider>
    <Pattern />
  </MuiThemeProvider>
);

export default App;
