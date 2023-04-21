import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from '@mui/material/';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { platformsData } from '../platformsData';

function Game( { id, slug, img, name, summary, rating, release, platforms, offset } ) {

  //const displayScore = oriSorce => (Math.round(oriSorce * 100) / 100).toFixed(2)
  const shortDes = !summary || summary.length < 150
  const shortSummary = oriSummary => {
    if(!summary || oriSummary.length < 150) {
      return oriSummary
    }
    else {
      return `${oriSummary.slice(0, 150)}...`
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
        <Stack
          spacing={0.5}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {platforms.map(platform =>
          <Chip
            key={platform}
            label={platformsData.find(element => element.id===platform).name}
            color="info"
            size="small"
            sx={{ '@media (max-width: 900px)': { fontSize: '0.6rem' } }}
          />
        )}
        </Stack>
        <Typography variant="body1" sx={{ flexGrow: 1, '@media (max-width: 900px)': { fontSize: '0.9rem' } }}>
          {showFullText ? summary : shortSummary(summary)}
        </Typography>
        {
          shortDes ? null :
          <Button onClick={handleShowMore}>
            {showFullText ? 'Read Less' : 'Read More'}
          </Button>
        }
      </CardContent>
    </Card>
  )
}

export default Game