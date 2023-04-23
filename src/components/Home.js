import {
  Typography,
  Container,
  Box,
  Avatar,
} from '@mui/material/';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import background from '../homepage-background.jpeg';

function Home() {
  return (
    <Container component="main" maxWidth={false} disableGutters>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height: "86vh",
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
    </Container>
  )
}

export default Home