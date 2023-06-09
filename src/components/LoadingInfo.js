import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Fab,
} from '@mui/material/';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { green } from '@mui/material/colors';

function LoadingInfo() {
  return(
    <Container component="main">
      <Box
        sx={{
          mt: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: "58vh",
        }}
      >
        <Box sx={{ m: 1, position: 'relative' }}>
          <Fab
            aria-label="save"
            color="primary"
          >
            <DownloadingIcon />
          </Fab>
          <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
              }}
          />
        </Box>
        <Typography variant='h6' sx={{ marginTop:'30px' }}>
          Getting there...
        </Typography>
      </Box>
    </Container>
  )
}

export default LoadingInfo