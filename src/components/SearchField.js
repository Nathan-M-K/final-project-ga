import {
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Typography,
  Rating,
} from '@mui/material/';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

function SearchField() {
  const convertScale = score => (score/100) * 5
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const options = searchResults.map(result => 
    ({ path: `/games/${result.id}`, 
    name: result.name, 
    first_release_date: result.first_release_date,
    total_rating: result.total_rating})
    );
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
    const raw = `fields name, first_release_date, total_rating; search "${value}"; limit 50;`
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

  return(
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
        />
      )}
      renderOption={(props, option) => (
        <li key={`${option.name}-${option.path}`} {...props}>
          <Link to={option.path} style={{ textDecoration: "none", width: "100%" }}>
            <Card elevation={0}>
              <CardContent>
                <Typography variant="body2" sx={{ display: "inline" }}>
                  {`${option.name} - `}
                </Typography>
                <Typography variant="body2" sx={{ display: "inline", color: "primary.darker", fontSize: '0.6rem' }}>
                  {`${(new Date(option.first_release_date*1000)).toLocaleDateString()} `}
                </Typography>
                <Rating
                  name="game-rating"
                  size="small"
                  value={convertScale(option.total_rating)}
                  readOnly
                  precision={0.1}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </CardContent>
            </Card>
          </Link>
        </li>
      )}
    />
  )
}

export default SearchField