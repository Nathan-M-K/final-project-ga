import {
  Typography,
  Container,
  Box,
  Pagination,
  Stack,
} from '@mui/material/';
import { useState, useEffect } from 'react';

import Game from './Game';
import LoadingInfo from './LoadingInfo';
import SortingForm from './SortingForm';
//import { example } from '../example';

function Games( {category} ) {

  const clientID = process.env.REACT_APP_IGDB_CLIENT_ID
  const auth = process.env.REACT_APP_IGDB_AUTH
  const corsProxy = process.env.REACT_APP_IGDB_CORS
  const [allGames, setAllGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const pageSize = 6
  const gameNumbers = (category==="all" ? 22792:867)
  const totalPages = Math.ceil(gameNumbers/pageSize)
  const [currentPage, setCurrentPage] = useState(1)
  const offset = (currentPage - 1)*pageSize
  const [sortByOptions, setSortByOptions] = useState("total_rating")
  const [sortOrder, setSortOrder] = useState("desc")
  const [sortBy, setSortBy] = useState("total_rating-desc");
  const totalRatingCount=(category==="all" ? 1:150)

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  
  useEffect(() => {
    setIsLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Client-ID", clientID);
    myHeaders.append("Authorization", auth);
    myHeaders.append("Content-Type", "text/plain");
    
    
    const raw = `fields name, cover, slug, storyline, summary, total_rating, first_release_date, platforms; sort ${sortByOptions} ${sortOrder}; where total_rating_count >= ${totalRatingCount} & total_rating > 0 & first_release_date > 0; limit ${pageSize}; offset ${offset};`;
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    let games = []
    
    fetch(corsProxy+"https://api.igdb.com/v4/games", requestOptions)
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(res)
        }
      })
      .then(data => {
        games = data
        const rawCover = data.map(game => `fields url; where game=${game.id};`)
        const requestOptionsCover = rawCover.map(sql => ({
            method: 'POST',
            headers: myHeaders,
            body: sql,
            redirect: 'follow',
          })
        )
        const promisesCover = requestOptionsCover.map(req => fetch(corsProxy+"https://api.igdb.com/v4/covers", req))
        return (Promise.all(promisesCover))
      })
      .then(res => {
        // Get a JSON object from each of the responses
        return Promise.all(res.map(res => res.json()));
      })
      .then(coverUrl => {
        const gamesWithUrl = coverUrl.map(
        (cover,index) => {
          if(!cover[0]){
            return {...games[index], url: "#",}
          }
          else{
            return {...games[index], url: `https:${cover[0].url}`.replace('t_thumb', 't_cover_big'),}
          }
        }
        )
        //console.log(gamesWithUrl)
        setAllGames(gamesWithUrl)
        setIsLoading(false)
      }
      )
      .catch(error => console.log('error', error));
    //eslint-disable-next-line
  }, [currentPage, sortByOptions, sortOrder, category]);

  return (
    <Container component="main">
      <Box
        sx={{
          mt: '30px',
          display: 'flex',
          '@media (max-width: 900px)': { flexDirection: 'column', alignItems: 'center' },
        }}
      >
      {
        isLoading ?
          <LoadingInfo />
        :
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              maxWidth: 'md',
              mb: '30px'
            }}
          >
            <Typography variant='h6'>
              {
                category==="all" ? "All games" : "Games with a minimum of 150 ratings"
              }
            </Typography>
              {allGames.map(game => 
                <Game 
                  key={game.id}
                  id={game.id}
                  slug={game.slug}
                  img={game.url}
                  name={game.name}
                  summary={game.summary}
                  rating={game.total_rating}
                  release={game.first_release_date}
                  platforms={game.platforms}
                  offset={offset}
                />
              )}
            <Stack spacing={2} sx={{ marginTop: '5px' }}>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} shape="rounded" variant="outlined" />
            </Stack>
          </Box>
      }
        <Box 
          sx={{ 
            mt:'30px',
            ml:'10px'
          }}>
          <Typography variant='h6'>Soring Options</Typography>
          <SortingForm 
            setSortByOptions={(value)=>setSortByOptions(value)}
            setSortOrder={(value)=>setSortOrder(value)}
            setCurrentPage={(value)=>setCurrentPage(value)}
            sortByOptions={sortByOptions}
            sortOrder={sortOrder}
            sortBy={sortBy}
            setSortBy={(value)=>setSortBy(value)}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Games