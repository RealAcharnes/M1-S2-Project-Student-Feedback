import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function FormCard({content, float}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card style={{ height: "680px", maxHeight:"700", width: "100%", backgroundImage: `url(${"/blueBG.png"})`, maxWidth:"890px",  margin: "auto", marginTop:"70px"}}
    >
      <div style={{backgroundColor: "white", height: "100%",  maxWidth:"480px", minWidth:"300px", float: float}}>
            {content}
      </div>
    </Card>
  );
}
