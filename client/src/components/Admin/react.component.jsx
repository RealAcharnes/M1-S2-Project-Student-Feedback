import React, {useEffect, useState} from 'react'

import { ApiClient } from 'admin-bro'

import { makeStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StorageIcon from '@material-ui/icons/Storage';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Parser from 'html-react-parser';


const api = new ApiClient()

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    fontFamily: "'Roboto', 'Poppins', sans-serif"
  },
  media: {
    height: 140,
  },
});

const MyReactComponent = (props) => {


const [data, setData] = useState(null)
const mystyle ={
    background: "linear-gradient(to bottom, rgba(3,75, 82, 1) 0%, rgba(3,75, 82, 0) 100%)",
    height: "100%",
    margin: 0,
    "background-repeat": "no-repeat",
    "background-attachment": "fixed",
}
const classes = useStyles();

  useEffect(() => {
    api.getDashboard().then((response) => {
        // console.log(response)
      setData(response.data.some)
    })
  }, [])

  const log = () =>{
      console.log(data)
  }

  const routeChange = (path, item) =>{
    let newPath = path;
    window.location.href = 'https://neuroeducation-feedback.herokuapp.com'+newPath;

  }

  return (
      <div style={mystyle}>
          <button onClick={()=>log()}>LOG</button>

          <div className="row">
                { data && data.map(item => (
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4"> 
                        <Card className={classes.root} style={{height:280, padding: "20px", "margin-bottom": "10px"}}>
                            <CardActionArea>
                                {/* <CardMedia
                                className={classes.media}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                                /> */}
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" >
                                    {/* <div className="row" >
                                        hii
                                    {Parser(item.icon)}
                                    </div> */}
                                    {item._decorated.name}
                                    {/* {item.icon} */}
                                    {/* <StorageIcon style={{color:"green",  float:"right"}} fontSize="large" /> */}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {item._decorated.name+' Resource in the database is shd.ksnkjsfmsfsdlfm.msf/sf/smf/sfns/.,fsmdfsn/s,fmsfms,msfnslkf.'}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>routeChange(item._decorated.href)}>
                                GO TO
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))
   }
            </div>

    </div>
  )
}
export default MyReactComponent