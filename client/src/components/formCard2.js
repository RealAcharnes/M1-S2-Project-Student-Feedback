import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


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

export default function FormCard2({content, float}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card style={{ height: "850px", maxHeight:"900", width: "100%", backgroundImage: `url(${"/blueBG.png"})`, maxWidth:"890px",  margin: "auto", marginTop:"70px"}}
    >
      <div style={{backgroundColor: "white",height: "100%",  minWidth:"300px", maxWidth:"600px", maxHeight:"770px" , width: "100%",  margin:"auto", marginTop: "40px",}}>
            {content}
      </div>
    </Card>
  );
}