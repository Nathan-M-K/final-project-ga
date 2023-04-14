import { ThemeProvider } from '@mui/material/styles';
import {
  Typography,
  ScopedCssBaseline,
  Container,
  Box,
  Avatar,
} from '@mui/material/';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import AppToolbar from './AppToolbar';
import Copyright from './Copyright';
import { theme } from '../theme';

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <AppToolbar />
      <ScopedCssBaseline>
        <Container component="main" maxWidth="lg">
          <Box
            sx={{
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.darker'}}>
              <SportsEsportsIcon />
            </Avatar>
            <Typography align='center' variant="h6">
              Welcome to Playtopia!<br/>
            </Typography>
            <Typography align='center' variant="h6">
              Please click 'GAMES' to begin
            </Typography>
          </Box>
          <Copyright sx={{ mt: 4, mb: 4 }}/>
        </Container>
      </ScopedCssBaseline>
    </ThemeProvider>
  )
}

export default Home