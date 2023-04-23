import { ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline,
} from '@mui/material/';

import AppToolbar from './AppToolbar';
import Copyright from './Copyright';
import { theme } from '../theme';

function Wrapper(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppToolbar />
        {props.comp}
        <Copyright />   
      </CssBaseline>
    </ThemeProvider>
  )
}

export default Wrapper