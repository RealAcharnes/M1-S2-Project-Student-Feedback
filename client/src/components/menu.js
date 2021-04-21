import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const ITEM_HEIGHT = 48; 

export default function MenuOption(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{float:"right",color: '#4257b2'}}
      >
        <MoreVertIcon />
        <span>Options</span>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            color: '#4257b2'
          },
        }}
      >
        {props.options && props.options.map((option) => (
          <MenuItem key={option.title} selected={option === 'Pyxis'} onClick={option.onclick} >
            {option.icon}{option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
