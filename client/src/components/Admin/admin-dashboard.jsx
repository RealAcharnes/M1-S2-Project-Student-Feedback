import React from "react";
import { useHistory } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StorageIcon from '@material-ui/icons/Storage';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import DashboardIcon from '@material-ui/icons/Dashboard';


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


    const routeChange = (path, item) =>{
    let newPath = path;
    if(item==="DATABASE"){
        return window.location.href = newPath;
    }
    history.push(newPath);
  }

  const childRoute = route =>{
    if(route==="USER"){
        window.location.href = 'http://localhost:5050/admin/resources/User'
    }
    else if(route==="QUIZZES"){
        window.location.href = 'http://localhost:5050/admin/resources/Quizzes'
    }
    else if(route==="HISTORY"){
        window.location.href = 'http://localhost:5050/admin/resources/history'
    }
  }

  const dashboardArray = [
      {
        title: "ADD ACCOUNT",
        path: '/adminRegister',
        children: [],
        message: "Add a new Admin or Teacher into the Database.",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <SupervisorAccountIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },
    {
        title: "EVOLUTION ",
        path: '/students',
        children: [],
        message: "As an admin or teacher, view all students progress with a few clicks",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <TrackChangesIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },
    {
        title: "ALL QUIZZES",
        path: '/questions',
        children: [],
        message: "A list of all quizzes in the database. View all with a few clicks",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <AssignmentIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },    
    {
        title: "ALL ANSWERS",
        path: '/answers',
        children: [],
        message: "A history of all student answers in the database. View all with a few clicks",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <RecentActorsIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },
    {
        title: "DASHBOARD",
        path: '/dashboard',
        children: [],
        message: "A link to the admin dashboard where you can see everything",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <DashboardIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },
    {
        title: "DATABASE",
        path: 'https://neuroeducation-feedback.herokuapp.com/admin/',
        children: ['USER', 'QUIZZES', 'HISTORY'],
        message: "This is a special page for the Admin. In desperate times of Database management this is a place to go.",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <StorageIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },
  ]

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="row">
                {dashboardArray && dashboardArray.map(item => (
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4"> 
                        <Card className={classes.root} style={{height:200, padding: "20px", "margin-bottom": "10px"}}>
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
                                    {/* <StorageIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" /> */}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {item.message}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" style={{background:"#3ccfcf", color: "white"}} onClick={()=>routeChange(item.path, item.title)}>
                                GO TO
                                </Button>
                                {item.children && item.children.map(child=> (
                                    <Button size="small" style={{background:"#3ccfcf", color: "white"}} onClick={()=>childRoute(child)}>
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
    </>
  );
};

export default AdminDashboard;
