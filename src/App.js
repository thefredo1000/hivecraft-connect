import React from 'react' 
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Card, Grid, CardActions } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import ConnectCard from './components/ConnectCard'

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css'

import PressStart2P from './fonts/PressStart2P-Regular.ttf';

function App() {

  const font = {
    fontFamily: 'Press Start 2P',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap') format('ttf')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#d49e17',
      },
      secondary: {
        main: '#FFDD0F',
      },
    },
    typography: {
      fontFamily: [
        'Press Start 2P',
      ],
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [font],
        },
      },
    },
  });
  return (
    <Router>
      <Route path={'/:topicId'}>
        <br />
        <Grid container justifyContent="center">
          <ThemeProvider theme={theme}>
            <div className="card">
              <div className="header">
                <h1>Connect to Hivecraft</h1>
                <h3>Use your xDAI wallet with Metamask</h3>
              </div>
              <br />
              <ConnectCard />
            </div>
          </ThemeProvider>
        </Grid>
      </Route>
    </Router>
  );
}

export default App;
