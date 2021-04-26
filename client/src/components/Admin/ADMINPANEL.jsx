import React, {useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "linear-gradient(to bottom, rgba(3,75, 82, 1) 0%, rgba(3,75, 82, 0) 100%)",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
const mystyle ={
  background: "linear-gradient(to bottom, rgba(3,75, 82, 1) 0%, rgba(3,75, 82, 0) 100%)",
  height: "100%",
  margin: 0,
  "background-repeat": "no-repeat",
  "background-attachment": "fixed",
}


// const api = new ApiClient()

const UserComponent = (props) => {
// const [data, setData] = useState({})
const classes = useStyles();
const [open, setOpen] = React.useState(true);
const [resources, setresources] = useState(null)

const handleClick = () => {
  setOpen(!open);
};

  useEffect(() => {
    setresources(props.resources)
  }, [props.resources])



  return (
    <div style={mystyle}>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            ADMIN PANEL
          </ListSubheader>
        }
        className={classes.root}
      >

        {resources && 
          <div>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Database" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {open && resources.map((resource)=> (
              <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={resource.name} />
                </ListItem>
              </List>
            </Collapse>
            ))
            }

          </div>
        }
        
        

        
      </List>
    </div>
  )
}
export default UserComponent