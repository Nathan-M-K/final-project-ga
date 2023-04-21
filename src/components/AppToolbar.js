import {
  AppBar,
  Toolbar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Autocomplete
} from '@mui/material/';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function AppToolbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const options = searchResults.map((result) => ({ path: `/games/${result.id}`, name: result.name, first_release_date: result.first_release_date}));
  const clientID = process.env.REACT_APP_IGDB_CLIENT_ID
  const auth = process.env.REACT_APP_IGDB_AUTH
  const corsProxy = process.env.REACT_APP_IGDB_CORS

  const handleSearchQueryChange = (event, value) => {
    setSearchQuery(value);
    // Fetch search results based on the search query
    // Set the searchResults state with the fetched results
    let myHeaders = new Headers();
    myHeaders.append("Client-ID", clientID);
    myHeaders.append("Authorization", auth);
    myHeaders.append("Content-Type", "text/plain");
    const raw = `fields name, first_release_date; search "${value}";`
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(corsProxy+"https://api.igdb.com/v4/games", requestOptions)
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(res)
        }
      })
      .then(data => setSearchResults(data))
      .catch(error => console.log('error', error));
  };

  return (
    <>
      <CssBaseline />
        <AppBar sx={{ position: "static", backgroundColor: 'neutral.main'}}>
          <Container maxWidth="lg">
            <Toolbar>
              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                <img
                  alt='gaming logo'
                  src='/playtopia-logo.png'
                  style={{ width: 48, height: 48}}
                />
              </Link>
              {/* <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                <Typography variant='h6'>
                  Playtopia
                </Typography>
              </Link> */}
              <Autocomplete
                freeSolo
                options={options}
                getOptionLabel={(option) => option.name}
                inputValue={searchQuery}
                onInputChange={handleSearchQueryChange}
                sx={{ flexGrow: 1, ml: '5px', }}
                renderInput={(params) => (
                  <TextField {...params} 
                    label="Search Games"
                    variant="outlined"
                    size="small"
                    color="nav"
                    // InputProps={{
                    //   style: { color: "#fff" }
                    // }}
                  />
                )}
                renderOption={(props, option) => (
                  <li key={`${option.name}-${option.path}`} {...props}>
                    <Link to={option.path} style={{ textDecoration: "none", fontSize: '0.8rem' }}>
                      {`${option.name} (${(new Date(option.first_release_date*1000)).toLocaleDateString()})`}
                    </Link>
                  </li>
                )}
              />
              {/* <Button color='nav' size='large' component={Link} to={'/'}>Home</Button> */}
              <Button color='nav' size='large' component={Link} to={'/games'}>Games</Button>
            </Toolbar>
          </Container>
        </AppBar>
    </>
  );
}

export default AppToolbar