import {
  Button,
  Menu,
  MenuItem,
} from '@mui/material/';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function GameMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
    //navigate("/games")
  };

  return (
    <>
      <Button
        id="basic-button"
        color="nav"
        size="large"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Games
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link to="/games-popular/" style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleClose}>Popular Games</MenuItem>
        </Link>
        <Link to="/games-all/" style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleClose}>All Games</MenuItem>
        </Link>
      </Menu>
    </>
  );
}

export default GameMenu