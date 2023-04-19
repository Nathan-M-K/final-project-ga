import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
} from '@mui/material/';
import { Link } from 'react-router-dom';

function AppToolbar() {
  return (
    <>
      <CssBaseline />
        <AppBar sx={{ position: "static", backgroundColor: 'neutral.main'}}>
          <Container maxWidth="lg">
            <Toolbar>
              <img
                alt='gaming logo'
                src='/playtopia-logo.png'
                style={{ width: 48, height: 48}}
              />
              <Typography variant='h6' sx={{ flexGrow: 1 }}>
                Playtopia
              </Typography>
              <Button color='nav' size='large' component={Link} to={'/'}>Home</Button>
              <Button color='nav' size='large' component={Link} to={'/games'}>Games</Button>
            </Toolbar>
          </Container>
        </AppBar>
    </>
  );
}

export default AppToolbar