import {
  Typography,
  Container,
  Box,
  Avatar,
} from '@mui/material/';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';

function PageNotFound() {
  return (
    <Container component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: "84vh"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'error.main'}}>
          <DoDisturbOffIcon />
        </Avatar>
        <Typography align='center' variant="h6">
          Oops, the page does not exist...
        </Typography>
      </Box>
    </Container>
  )
}

export default PageNotFound