import React, {useState} from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom"

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




// const useStyles = makeStyles((theme) => ({
//     header: {
//       position: "relative",
//       background:
//         "linear-gradient(87deg," + theme.palette.info.main + ",#1171ef)",
//       paddingBottom: "8rem",
//       paddingTop: "3rem",
//       [theme.breakpoints.up("md")]: {
//         paddingTop: "8rem",
//       },
//     },
//     containerRoot: {
//       [theme.breakpoints.up("md")]: {
//         paddingLeft: "39px",
//         paddingRight: "39px",
//       },
//     },
// }));

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const AdminDashboard = () => {
    let history = useHistory();
  const classes = useStyles();
  const [user, setuser] = useState(false)
  const [quizzes, setquizzes] = useState(false)
  const [hist, sethist] = useState(false)
  const [dashboard, setdashboard] = useState(true)


  const routeChange = (path, item) =>{
    let newPath = path;
    if(item==="DATABASE"){
        return window.location.href = newPath;
    }
    history.push(newPath);
  }

  const childRoute = route =>{
    if(route === 'USER'){
        setuser(true);
        setdashboard(false);
        sethist(false);
        setquizzes(false);
    }
    else if(route === 'HISTORY'){
        sethist(true);
        setuser(false);
        setdashboard(false);
        setquizzes(false);
    }
    else if(route === 'DASHBOARD'){
        setdashboard(true);
        sethist(false);
        setuser(false);
        setquizzes(false);
    }
    else if(route === 'QUIZZES'){
        setquizzes(true);
        sethist(false);
        setuser(false);
        setdashboard(false);
    }
  }

  const dashboardArray = [
      {
          title: "DATABASE",
          path: 'https://neuroeducation-feedback.herokuapp.com/admin/',
          children: ['USER', 'QUIZZES', 'HISTORY'],
          message: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
          actions : {
              one: "Share",
              two: "Learn More"
          },
          icon: <StorageIcon style={{color:"green",  float:"right"}} fontSize="large" />
      },
      {
        title: "ADD ACCOUNT",
        path: '/adminRegister',
        children: [],
        message: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <SupervisorAccountIcon style={{color:"green",  float:"right"}} fontSize="large" />
    },
    {
        title: "ALL QUIZZES",
        path: '/questions',
        children: [],
        message: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <AssignmentIcon style={{color:"green",  float:"right"}} fontSize="large" />
    },    
    {
        title: "ALL ANSWERS",
        path: '/answers',
        children: [],
        message: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <RecentActorsIcon style={{color:"green",  float:"right"}} fontSize="large" />
    },
    {
        title: "EVOLUTION ",
        path: '/students',
        children: [],
        message: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <TrackChangesIcon style={{color:"green",  float:"right"}} fontSize="large" />
    },
    {
        title: "DASHBOARD",
        path: '/test',
        children: [],
        message: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <DashboardIcon style={{color:"green",  float:"right"}} fontSize="large" />
    }
  ]

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="row">
                { dashboard && dashboardArray && dashboardArray.map(item => (
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
                                    {item.title}
                                    {item.icon}
                                    {/* <StorageIcon style={{color:"green",  float:"right"}} fontSize="large" /> */}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {item.message}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={()=>routeChange(item.path, item.title)}>
                                GO TO
                                </Button>
                                {item.children && item.children.map(child=> (
                                    <Button size="small" color="primary" onClick={()=>childRoute(child)}>
                                        {child}
                                    </Button>
                                 ))
                                }
                            </CardActions>
                        </Card>
                    </div>
                ))
   }
            </div>
        </div>
        
        { user &&
        <div className="col-xs-12 col-sm-12 col-md-12" >
            <iframe src="https://neuroeducation-feedback.herokuapp.com/admin/resources/User" style={{maxWidth:10040, width:'100%', maxHeight : "800px", height:"800px", overflow:'visible'}}/>
        </div>
        }
        { quizzes &&
        <div className="col-xs-12 col-sm-12 col-md-12" >
            <iframe src="https://neuroeducation-feedback.herokuapp.com/admin/resources/Quizzes" style={{maxWidth:10040, width:'100%', maxHeight : "800px", height:"800px", overflow:'visible'}}/>
        </div>
        }
        { hist &&
        <div className="col-xs-12 col-sm-12 col-md-12" >
            <iframe src="https://neuroeducation-feedback.herokuapp.com/admin/resources/history" style={{maxWidth:10040, width:'100%', maxHeight : "800px", height:"800px", overflow:'visible'}}/>
        </div>
        }
    </>
  );
};

export default AdminDashboard;
