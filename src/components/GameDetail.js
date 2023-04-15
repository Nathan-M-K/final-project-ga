import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  ImageList,
  ImageListItem,
} from '@mui/material/';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingInfo from './LoadingInfo';

function GameDetail() {
  let params = useParams()
  const getID = gamaParams => {
    const index = gamaParams.indexOf("-")
    const gameID = gamaParams.slice(0,index)
    return gameID
  }
  const convertScale = score => (score/100) * 5
  const displayScore = oriSorce => (Math.round(oriSorce * 100) / 100).toFixed(2)
  const clientID = process.env.REACT_APP_IGDB_CLIENT_ID
  const auth = process.env.REACT_APP_IGDB_AUTH
  const corsProxy = process.env.REACT_APP_IGDB_CORS
  const [currentGame, setCurrentGame] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [screenShots, setScreenShots] = useState([])

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Client-ID", clientID);
    myHeaders.append("Authorization", auth);
    myHeaders.append("Content-Type", "text/plain");
    
    const raw = `fields *; where id=${getID(params.gameID)};`;
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    let game = []
    
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
        game = data[0]
        const sql = `fields url; where game=${game.id};`
        const requestOtherEndPoints = {
          method: 'POST',
          headers: myHeaders,
          body: sql,
          redirect: 'follow',
        }
        const resCover = fetch(corsProxy+"https://api.igdb.com/v4/covers", requestOtherEndPoints)
        const resScreenshot = fetch(corsProxy+"https://api.igdb.com/v4/screenshots", requestOtherEndPoints)
        return Promise.all([resCover, resScreenshot])
      })
      .then(res => {
        // Get a JSON object from each of the responses
        return Promise.all(res.map(res => res.json()));
      })
      .then(data => {
        const gamesWithUrl = {...game, url: `https:${data[0][0].url}`.replace('t_thumb', 't_cover_big'),}
        //console.log(data[1])
        setCurrentGame(gamesWithUrl)
        setScreenShots(data[1])
        setIsLoading(false)
      })
      .catch(error => console.log('error', error));
    //eslint-disable-next-line
  }, []);

  //console.log("RENDER GameDetails!")

  if(isLoading) {
    return(
      <LoadingInfo />
    )
  }

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        }}
      >
        <Card sx={{ display: 'flex', paddingBottom: '20px', maxWidth: 'xl' }}>
          <CardMedia
            component="img"
            image={currentGame.url}
            alt="game cover image"
            sx={{width: "264px", height: "374px", marginTop: '20px' }}
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h4">
                {currentGame.name}
            </Typography>
            <Rating
              name="game-rating"
              value={convertScale(currentGame.total_rating)}
              readOnly
              precision={0.1}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Typography variant="subtitle2">
              {displayScore(currentGame.total_rating)}/100 Rating based on {currentGame.total_rating_count} IGDB user and external critic scores
            </Typography>
            <Typography variant="subtitle2">
              Releast Date:  {(new Date(currentGame.first_release_date*1000)).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
                {!currentGame.storyline ? currentGame.summary : currentGame.storyline}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ marginTop: '20px', display: 'flex' }}>
        <ImageList cols={4}>
          {screenShots.map((img) => (
            <ImageListItem key={img.id}>
              <img
                src={`https:${img.url}`.replace('t_thumb', 't_screenshot_med')}
                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={img.id}
                loading="lazy"
              />
            </ImageListItem>
            ))}
        </ImageList>
      </Box>
    </Container>
  )
}

export default GameDetail