import Typography from '@mui/material/Typography';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      <br/>
      {'Created by Nathan Kang'}
    </Typography>
  );
}

export default Copyright