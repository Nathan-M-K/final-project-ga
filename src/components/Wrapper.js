import { ThemeProvider } from '@mui/material/styles';
import {
  ScopedCssBaseline,
} from '@mui/material/';

import AppToolbar from './AppToolbar';
import Copyright from './Copyright';
import { theme } from '../theme';

function Wrapper(props) {
  return (
    <ThemeProvider theme={theme}>
      <AppToolbar />
      <ScopedCssBaseline>
        {props.comp}
        <Copyright sx={{ marginTop: '30px' }} />
      </ScopedCssBaseline>
    </ThemeProvider>
  )
}

export default Wrapper