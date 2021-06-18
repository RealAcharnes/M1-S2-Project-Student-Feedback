import React from 'react';
import { Link} from "react-router-dom";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
// import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  listItemText:{
    fontSize:'0.9em',//Insert your required size
    fontFamily: "'Roboto', 'Poppins', sans-serif"
  },
  list: {
    width: 250,
    color:'#4257b2', 
    fontWeight: "bold", 
    fontFamily: "'Roboto', 'Poppins', sans-serif"
  },
  fullList: {
    width: 'auto',
        color:'#4257b2', 
    fontWeight: "bold", 
    fontFamily: "'Roboto', 'Poppins', sans-serif"
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

    <List style={{"paddingTop": "30px", background: "#4257b2"}}>
        <ListItem button key={"home"} style={{color: 'white'}}>
            <ListItemIcon> <MenuIcon style={{color: 'white'}}fontsize="large"/></ListItemIcon>
            <ListItemText primary={"MENU"} classes={{primary:classes.listItemText}}/>   
          </ListItem>
 
      </List>
      <List>
        {props.lists && (props.lists).map((text, index) => (
         <Link to={text.link} style={{color: '#4257b2', textDecoration: 'none'}}>   
          <ListItem button key={text.title}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.title} classes={{primary:classes.listItemText}}/>   
          </ListItem>
         </Link> 
        ))}
      </List>
      {/* <Divider /> */}
      <List style={{position: "absolute",bottom: 0}}>
        {props.actions.map((text, index) => (
         <Link to={text.link} onClick={text.onclick} style={{color: '#4257b2', textDecoration: 'none'}}>   
            <ListItem button key={text.title}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.title} classes={{primary:classes.listItemText}}/>   
            </ListItem>
        </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div >
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon style={{color:"white",  float:"left"}} fontSize="large"></MenuIcon></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} style={{background:"#e6e6d5"}}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
