import {
  AppBar,
  Toolbar,
  Container,
} from '@mui/material/';
import { Link } from 'react-router-dom';
import SearchField from './SearchField';
import GameMenu from './GameMenu';

function AppToolbar() {
  return(
    <AppBar sx={{ position: "static", backgroundColor: 'neutral.main'}}>
      <Container maxWidth="lg">
        <Toolbar>
          <Link to="/">
            <img
              alt='gaming logo'
              src='/playtopia-logo.png'
              style={{ width: 48, height: 48 }}
            />
          </Link>
          <SearchField />
          <GameMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppToolbar