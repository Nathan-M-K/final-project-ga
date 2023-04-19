import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material/';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Game( { id, slug, img, name, summary, rating, release, ranking, offset } ) {

  //const displayScore = oriSorce => (Math.round(oriSorce * 100) / 100).toFixed(2)
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
    <Card sx={{ display: 'flex', marginTop: '10px' }}>
      {/* <Link to={`/games/${id}-${slug}`}> */}
      <Link to={`/games/${id}`}>
        <CardMedia
          component="img"
          image={img}
          alt="game cover image"
          sx={{width: "120px", height: "160px", marginTop: '20px' }}
        />
      </Link>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* <Link to={`/games/${id}-${slug}`}> */}
        <Link to={`/games/${id}`} style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ '@media (max-width: 900px)': { fontSize: '1.0rem' } }}>
              {name} ({(new Date(release*1000)).getFullYear()})
          </Typography>
        </Link>
        <Typography variant="body1" sx={{ flexGrow: 1, '@media (max-width: 900px)': { fontSize: '0.8em' } }}>
          {showFullText ? summary : shortSummary(summary)}
        </Typography>
        {
          shortDes ? null :
          <Button onClick={handleShowMore}>
            {showFullText ? 'Read Less' : 'Read More'}
          </Button>
        }
        {/* <Typography variant="body2" sx={{ justifySelf: 'end' }}>
          Current Ranking: {offset+ranking+1}
        </Typography> */}
      </CardContent>
    </Card>
  )
}

export default Game