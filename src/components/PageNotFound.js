import { ThemeProvider } from '@mui/material/styles';
import {
  Typography,
  ScopedCssBaseline,
  Container,
  Box,
  Avatar,
} from '@mui/material/';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';

import AppToolbar from './AppToolbar';
import Copyright from './Copyright';
import { theme } from '../theme';

function PageNotFound() {
  return (
    <ThemeProvider theme={theme}>
      <AppToolbar />
      <ScopedCssBaseline>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'error.main'}}>
              <DoDisturbOffIcon />
            </Avatar>
            <Typography align='center' variant="h6">
              Oops, the page does not exist...
            </Typography>
          </Box>
          <Copyright sx={{ mt: 4, mb: 4 }}/>
        </Container>
      </ScopedCssBaseline>
    </ThemeProvider>
  )
}

export default PageNotFound