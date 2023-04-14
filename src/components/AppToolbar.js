import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function AppToolbar() {
  return (
    <AppBar sx={{ position: "static", maxWidth: "xl", margin: "0 auto", backgroundColor: 'neutral.main'}}>
      <Toolbar>
        <img
          alt='gaming logo'
          src='/logo192.png'
          style={{ width: 48, height: 48, paddingRight: 24 }}
        />
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Playtopia
        </Typography>
        <Button color='nav' size='large' component={Link} to={'/'}>Home</Button>
        <Button color='nav' size='large' component={Link} to={'/games'}>Games</Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar