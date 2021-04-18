import React, {useEffect, useState} from 'react'
// import { InputGroup, Label, Box } from '@admin-bro/design-system'
// import { ApiClient } from 'admin-bro'
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
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

const AdminbroDashboard = (props) => {
const [data, setData] = useState({})
const classes = useStyles();
const [open, setOpen] = React.useState(true);
const [resources, setresources] = useState(null)

const handleClick = () => {
  setOpen(!open);
};

const sidebar ={
  background: '#f4f4f4',
  margin: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  // borderRadius: "10px" 
}

  useEffect(() => {
    // api.getDashboard().then((response) => {
    //   setData(response.data)
    // })
    setresources(props.resources)
  }, [])


  const log = () => {
      console.log(props)
  }

  return (
      <div style={mystyle}>
          <button onClick={()=>log()}>LOG</button>

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
      {/* <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="All Questions" />
      </ListItem>


      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="All Answers" />
      </ListItem> */}


      { resources && 
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
          {/* <div className={`quiz`}>
            <a href="/">
            <span role="img" aria-label="about us">&#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;</span>
            About us
            </a>
            <a href="/">
            <span role="img" aria-label="price">&#x1f4b8;</span>
            Pricing
            </a>
            <a href="/">
            <span role="img" aria-label="contact">&#x1f4e9;</span>
            Contact
            </a>
          </div>
          <div className={`quiz`} style={sidebar}>
              <h4>Cet étudiant n'a répondu à aucun quiz</h4>

          </div>  
          <div className={`quiz`} style={sidebar}>
              <h4>Cet étudiant n'a répondu à aucun quiz</h4>

          </div>  */}
    </div>
  )
}
export default AdminbroDashboard