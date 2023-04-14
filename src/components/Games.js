import { ThemeProvider } from '@mui/material/styles';
import {
  Typography,
  ScopedCssBaseline,
  Container,
  Box,
} from '@mui/material/';
import { useState, useEffect } from 'react';

import AppToolbar from './AppToolbar';
import Copyright from './Copyright';
import Game from './Game';
//import { example } from '../example';
import { theme } from '../theme';

function Games() {

  const clientID = process.env.REACT_APP_IGDB_CLIENT_ID
  const auth = process.env.REACT_APP_IGDB_AUTH
  const corsProxy = process.env.REACT_APP_IGDB_CORS
  const [allGames, setAllGames] = useState([])

  useEffect(() => {
    // let myHeaders = new Headers();
    // myHeaders.append("Client-ID", clientID);
    // myHeaders.append("Authorization", auth);
    // myHeaders.append("Content-Type", "text/plain");
    // myHeaders.append("Cookie", "__cf_bm=vO6rXf4Qsam4.9FDdMjXeBMHYH4bFXCdNFCUDP2rx7s-1681121408-0-AfjtwGoAm/5oJnL2bGGWdLVn8BRem6eq7M9JtSu0IrwzDSgLSHDdXL5QSuDLBTT5M3jV2nrEFzFosoNM2IXT4ts=");

    // const raw = "fields name, cover, slug, storyline, summary, aggregated_rating, first_release_date; sort aggregated_rating asc; where aggregated_rating>93;";

    // const requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch(corsProxy+"https://api.igdb.com/v4/games", requestOptions)
    //   .then(res => {
    //     if(res.ok) {
    //       return res.json()
    //     }
    //     else {
    //       return Promise.reject(res)
    //     }
    //   })
    //   .then(data => setAllGames(data))
    //   .catch(error => console.log('error', error));

    let myHeaders = new Headers();
    myHeaders.append("Client-ID", clientID);
    myHeaders.append("Authorization", auth);
    myHeaders.append("Content-Type", "text/plain");
    //myHeaders.append("Cookie", "__cf_bm=vO6rXf4Qsam4.9FDdMjXeBMHYH4bFXCdNFCUDP2rx7s-1681121408-0-AfjtwGoAm/5oJnL2bGGWdLVn8BRem6eq7M9JtSu0IrwzDSgLSHDdXL5QSuDLBTT5M3jV2nrEFzFosoNM2IXT4ts=");
    
    const raw = "fields name, cover, slug, storyline, summary, aggregated_rating, first_release_date; sort aggregated_rating asc; where aggregated_rating>94;";
    
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
        (cover,index) => ({...games[index], url: `https:${cover[0].url}`.replace('t_thumb', 't_cover_big'),}))
        //console.log(gamesWithUrl)
        setAllGames(gamesWithUrl)
      }
      )
      .catch(error => console.log('error', error));
    //eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppToolbar />
      <ScopedCssBaseline>
        <Container component="main" maxWidth="xl">
          <Box
            sx={{
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            }}
          >
          <Typography variant='h6'>High Rating Games</Typography>
            {allGames.map( game => 
              <Game key={game.id} img={game.url} name={game.name} summary={game.summary} rating={game.aggregated_rating} />
            )}
          </Box>
          <Copyright sx={{ mt: 4, mb: 4 }}/>
        </Container>
      </ScopedCssBaseline>
    </ThemeProvider>
  )
}

export default Games