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
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material/';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingInfo from './LoadingInfo';
import VideoPlayer from './VideoPlayer';
import { Link } from 'react-router-dom';
import { platformsData } from '../platformsData';
import { genresData } from '../genresData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function GameDetail() {
  let params = useParams()
  // const getID = gamaParams => {
  //   const index = gamaParams.indexOf("-")
  //   const gameID = gamaParams.slice(0,index)
  //   return gameID
  // }
  const convertScale = score => (score/100) * 5
  const displayScore = oriSorce => (Math.round(oriSorce * 100) / 100).toFixed(2)
  const clientID = process.env.REACT_APP_IGDB_CLIENT_ID
  const auth = process.env.REACT_APP_IGDB_AUTH
  const corsProxy = process.env.REACT_APP_IGDB_CORS
  const [currentGame, setCurrentGame] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [screenShots, setScreenShots] = useState([])
  const [similarGames, setSimilarGames] = useState([])
  const [similarId, setSimilarId] = useState([])
  const [videoUrl, setVideoUrl] = useState("")
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //maxWidth: '100%',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    //boxShadow: 24,
  };

  useEffect(() => {
    setCurrentGame([])
    setScreenShots([])
    setSimilarGames([])
    setSimilarId([])
    setVideoUrl("")
    setIsLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Client-ID", clientID);
    myHeaders.append("Authorization", auth);
    myHeaders.append("Content-Type", "text/plain");
    
    //const raw = `fields *; where id=${getID(params.gameID)};`;
    const raw = `fields *; where id=${params.gameID};`;
    
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
        const sql1 = `fields video_id; where game=${game.id};`
        const similarGames = game.similar_games
        //console.log(similarGames)
        setSimilarId(similarGames)
        let similarCover, requestOptionsCover, promisesCover
        const requestOtherEndPoints = {
          method: 'POST',
          headers: myHeaders,
          body: sql,
          redirect: 'follow',
        }
        const requestOtherEndPoints1 = {
          method: 'POST',
          headers: myHeaders,
          body: sql1,
          redirect: 'follow',
        }
        const resCover = fetch(corsProxy+"https://api.igdb.com/v4/covers", requestOtherEndPoints)
        const resScreenshot = fetch(corsProxy+"https://api.igdb.com/v4/screenshots", requestOtherEndPoints)
        const resVideo = fetch(corsProxy+"https://api.igdb.com/v4/game_videos", requestOtherEndPoints1)
        if(similarGames){
          similarCover = similarGames.map(id => `fields url; where game=${id};`)
          requestOptionsCover = similarCover.map(sql => ({
            method: 'POST',
            headers: myHeaders,
            body: sql,
            redirect: 'follow',
          })
          )
          promisesCover = requestOptionsCover.map(req => fetch(corsProxy+"https://api.igdb.com/v4/covers", req))
          return Promise.all([resCover, resScreenshot, resVideo, ...promisesCover])
        }
        else {
          return Promise.all([resCover, resScreenshot, resVideo])
        }
      })
      .then(res => {
        // Get a JSON object from each of the responses
        return Promise.all(res.map(res => res.json()));
      })
      .then(data => {
        let gamesWithUrl
        if(data[0][0]){
          gamesWithUrl = {...game, url: `https:${data[0][0].url}`.replace('t_thumb', 't_cover_big'),}
        }
        else {
          gamesWithUrl = {...game, url: "#",}
        }
        if(data[2][0]) {
          setVideoUrl(`https://www.youtube.com/watch?v=${data[2][0].video_id}`)
        }
        setCurrentGame(gamesWithUrl)
        setScreenShots(data[1])
        if(data.length>3){
          setSimilarGames(data.slice(3).map(id=>id[0]))
        }
        setIsLoading(false)
      })
      .catch(error => console.log('error', error));
    //eslint-disable-next-line
  }, [params]);

  //console.log("RENDER GameDetails!")

  if(isLoading) {
    return(
      <LoadingInfo />
    )
  }

  return (
    <Container component="main">
      <Box
        sx={{
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        }}
      >
        <Card sx={{ display: 'flex', paddingBottom: '20px', '@media (max-width: 700px)': { flexDirection: 'column' } }}>
          <CardMedia
            component="img"
            image={currentGame.url}
            alt="game cover image"
            sx={{width: "264px", height: "374px", marginTop: '20px', '@media (max-width: 700px)': { width: "100%", height: "auto" } }}
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
            <Typography variant="subtitle2">
              Platforms: {currentGame.platforms.map(platform => `${platformsData.find(element => element.id===platform).name}, `)}
            </Typography>
            <Typography variant="subtitle2">
              Genres: {currentGame.genres.map(genre => `${genresData.find(element => element.id===genre).name}, `)}
            </Typography>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="subtitle2" sx={{ width: '33%', flexShrink: 0 }}>Storyline:</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Please click to expand/collapse...</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  {!currentGame.storyline ? currentGame.summary : currentGame.storyline}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* <Typography variant="body2">
                {!currentGame.storyline ? currentGame.summary : currentGame.storyline}
            </Typography> */}
          </CardContent>
        </Card>
      </Box>
      <Typography variant='h5' sx={{ mt:'20px', textAlign:'center' }}>Screenshots</Typography>
      <Box sx={{ display: 'flex' }}>
        <ImageList cols={4} sx={{ width: '100%' }}>
          {screenShots.map((img, index) => (
              <ImageListItem key={`${img.id}-${index}`}>
                <img
                  src={`https:${img.url}`.replace('t_thumb', 't_screenshot_med')}
                  alt={img.id}
                  loading="lazy"
                  onClick={() => handleOpen(img)}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={`https:${selectedImage?.url}`.replace('t_thumb', 't_screenshot_huge')} alt={selectedImage?.id} style={{ maxWidth: '100%', minWidth: '400px' }} />
        </Box>
      </Modal>
      {
        videoUrl ?
        <>
          <Typography variant='h5' sx={{ mt:'20px', textAlign:'center' }}>Video</Typography>
          <Box sx={{ mt: '5px', display: 'flex', justifyContent: 'center'}}>
            <VideoPlayer url={videoUrl}/>
          </Box>
        </>
        : null
      }
      <Typography variant='h5' sx={{ mt:'20px', textAlign:'center' }}>You may also like</Typography>
      <Box sx={{ display: 'flex' }}>
        <ImageList cols={8} sx={{ width: '100%' }}>
          {similarGames.map((img, index) => (
            <Link to={`/games/${similarId[index]}`}>
              <ImageListItem key={`${img.id}-${index}-${index}`}>
                <img
                  src={`https:${img.url}`.replace('t_thumb', 't_cover_big')}
                  alt={img.id}
                  loading="lazy"
                />
              </ImageListItem>
            </Link>
            ))}
        </ImageList>
      </Box>
    </Container>
  )
}

export default GameDetail