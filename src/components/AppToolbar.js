import {
  AppBar,
  Toolbar,
  Button,
  Container,
} from '@mui/material/';
import { Link } from 'react-router-dom';
import SearchField from './SearchField';

function AppToolbar() {
  return(
      <AppBar sx={{ position: "static", backgroundColor: 'neutral.main'}}>
        <Container maxWidth="lg">
          <Toolbar>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              <img
                alt='gaming logo'
                src='/playtopia-logo.png'
                style={{ width: 48, height: 48 }}
              />
            </Link>
            <SearchField />
            <Button color='nav' size='large' component={Link} to={'/games'}>Games</Button>
          </Toolbar>
        </Container>
      </AppBar>
  );
}

export default AppToolbar