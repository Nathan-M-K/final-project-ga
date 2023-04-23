import {
  Typography,
  Container,
  Box,
  Link
} from '@mui/material/';

function Copyright(props) {
  return (
    <Container component="footer" maxWidth={false} disableGutters>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'neutral.main'
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}{new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Created by Nathan Kang'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Game data provided by'} {'IGDB '} 
          <Link color="inherit" target="_blank" href="https://api-docs.igdb.com/#getting-started">
            {'API'}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Copyright