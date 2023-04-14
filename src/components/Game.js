import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material/';
import { useState } from 'react';

function Game( {img, name, summary, rating} ) {

  //const imgUrl = oriUrl => oriUrl.replace('t_thumb', 't_cover_big')
  const displayScore = oriSorce => (Math.round(oriSorce * 100) / 100).toFixed(2)
  const shortDes = summary.length < 280
  const shortSummary = oriSummary => {
    if(oriSummary.length < 280) {
      return oriSummary
    }
    else {
      return `${oriSummary.slice(0, 280)}...`
    }
  }
  const [showFullText, setShowFullText] = useState(false);
  const handleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <Card sx={{ display: 'flex', marginTop: '10px', maxWidth: 'md' }}>
      <CardMedia
        component="img"
        // image={`https:${imgUrl(img)}`}
        //image="https://images.igdb.com/igdb/image/upload/t_cover_big/co272w.jpg"
        image={img}
        alt="game cover image"
        sx={{width: "120px", height: "160px", marginTop: '20px' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">
          {name}
        </Typography>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {showFullText ? summary : shortSummary(summary)}
        </Typography>
        {
          shortDes ? null :
          <Button onClick={handleShowMore}>
            {showFullText ? 'Read Less' : 'Read More'}
          </Button>
        }
        <Typography variant="body2" sx={{ justifySelf: 'end' }}>
          Rating: {displayScore(rating)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Game