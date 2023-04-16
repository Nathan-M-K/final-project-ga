import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Slider, IconButton, Box } from '@mui/material/';
import { PlayArrow, Pause, VolumeUp, VolumeOff } from '@mui/icons-material/';
import Forward5Icon from '@mui/icons-material/Forward5';
import Replay5Icon from '@mui/icons-material/Replay5';

function VideoPlayer( { url } ) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [played, setPlayed] = useState(0)
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
  };

  const handleSeekChange = (e, newValue) => {
    setPlayed(parseFloat(newValue/100));
    playerRef.current.seekTo(parseFloat(newValue/100));
  };

  const handleVolumeClick = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const handleSkipNext = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5, 'seconds')
  };

  const handleSkipPrevious = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 3, 'seconds')
  };

  const handlePlayerProgress = (e) => {
    //console.log('onProgress', e)
    setPlayed(e.played)
  }

  const handleEnded = () => {
    //console.log("Ended!")
    setPlaying(false)
  }

  return (
    <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: '450px',
        width: '800px',
        '@media (max-width: 700px)': { height: '400px' },
        '@media (max-width: 500px)': { height: '300px' },
        }}
      >
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        url={url}
        playing={playing}
        volume={volume}
        played={played}
        ref={playerRef}
        onProgress={handlePlayerProgress}
        onEnded={handleEnded}
        // onPlay={() => console.log('onPlay')}
        // onPause={() => console.log('onPause')}
        // onVolumeChange={(e) => console.log('onVolumeChange', e)}
        // onProgress={(e) => console.log('onProgress', e)}
      />
      <Box
        sx={{
        marginTop: '2px',
        display: 'flex',
        justifyContent: 'start',
        }}
      >
        <IconButton onClick={handleSkipPrevious}>
          <Replay5Icon fontSize='large' />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {playing ? <Pause fontSize='large'/> : <PlayArrow fontSize='large'/>}
          </IconButton>
          <IconButton onClick={handleSkipNext}>
            <Forward5Icon fontSize='large'/>
          </IconButton>
          <Slider min={0} max={100} value={played*100} onChange={handleSeekChange} sx={{ marginTop: '10px'}} />
          <IconButton onClick={handleVolumeClick} sx={{ marginLeft: '10px' }}>
            {volume === 0 ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <Slider min={0} max={1} step={0.01} value={volume} onChange={handleVolumeChange} sx={{ marginTop: '10px'}} />
      </Box>
    </Box>
  );
}

export default VideoPlayer