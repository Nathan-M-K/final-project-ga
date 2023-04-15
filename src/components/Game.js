import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material/';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Game( { id, slug, img, name, summary, rating, release } ) {

  const displayScore = oriSorce => (Math.round(oriSorce * 100) / 100).toFixed(2)
  const shortDes = !summary || summary.length < 280
  const shortSummary = oriSummary => {
    if(!summary || oriSummary.length < 280) {
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
      <Link to={`/games/${id}-${slug}`}>
        <CardMedia
          component="img"
          image={img}
          alt="game cover image"
          sx={{width: "120px", height: "160px", marginTop: '20px' }}
        />
      </Link>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={`/games/${id}-${slug}`}>
          <Typography variant="h6">
              {name} ({(new Date(release*1000)).getFullYear()})
          </Typography>
        </Link>
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