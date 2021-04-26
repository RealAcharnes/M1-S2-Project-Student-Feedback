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
        window.location.href = 'https://neuroeducation-feedback.herokuapp.com/admin/resources/User'
    }
    else if(route==="QUIZZES"){
        window.location.href = 'https://neuroeducation-feedback.herokuapp.com/admin/resources/Quiz'
    }
    else if(route==="HISTORY"){
        window.location.href = 'https://neuroeducation-feedback.herokuapp.com/admin/resources/history'
    }
  }

  const dashboardArray = [
      {
        title: "AJOUTER UN COMPTE",
        path: '/adminRegister',
        children: [],
        message: "Ajouter un nouvel administrateur ou enseignant dans la base de données.",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <SupervisorAccountIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },

    {
        title: "TOUS LES QUIZZ",
        path: '/questions',
        children: [],
        message: "Une liste de tous les quiz de la base de données. Visualisez-les tous en quelques clics",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <AssignmentIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },    
    {
        title: "PAGE RÉPONSES",
        path: '/answers',
        children: [],
        message: "Un historique de toutes les réponses des élèves dans la base de données. Tout visualiser en quelques clics",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <RecentActorsIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },
    {
        title: "EVOLUTION",
        path: '/students',
        children: [],
        message: "En tant qu'administrateur ou enseignant, vous pouvez visualiser les progrès de tous les élèves en quelques clics.",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <TrackChangesIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },
    // {
    //     title: "DASHBOARD",
    //     path: '/dashboard',
    //     children: [],
    //     message: "A link to the admin dashboard where you can see everything",
    //     actions : {
    //         one: "Share",
    //         two: "Learn More"
    //     },
    //     icon: <DashboardIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    // },
    {
        title: "BASE DE DONNEES",
        path: 'https://neuroeducation-feedback.herokuapp.com/admin/',
        children: ['USER', 'QUIZZES', 'HISTORY'],
        message: "Il s'agit d'une page spéciale pour l'administrateur. Pour la gestion de la base de données.",
        actions : {
            one: "Share",
            two: "Learn More"
        },
        icon: <StorageIcon style={{color:"#4257b2",  float:"right"}} fontSize="large" />
    },
  ]

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12" style={{paddingTop: "60px"}}>
            <div className="row">
                {dashboardArray && dashboardArray.map(item => (
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4"> 
                        <Card className={classes.root} style={{height:235, padding: "20px", "margin-bottom": "10px"}}>
                            <CardActionArea>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" >
                                    <Typography variant="h6" style={{color:"#4257b2"}}>{item.title} <div className="underlinee"></div></Typography>
                                    {item.icon}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {item.message}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions >
                                {item.title=== ( "BASE DE DONNEES") ? ("") : 
                                <Button size="small" style={{backgroundColor: "transparent", color: "#4257b2", border: "1px solid #4257b2"}} onClick={()=>routeChange(item.path, item.title)}>
                                GO TO
                                </Button>
                                }

                                {item.children && item.children.map(child=> (
                                    <Button 
                                    size="small" 
                                    style={{backgroundColor: "transparent", color: "#4257b2", border: "1px solid #4257b2", width: "45%"}} 
                                    onClick={()=>childRoute(child)}>
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
