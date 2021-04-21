import React, {useState} from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import IconButton from '@material-ui/core/IconButton';
import NoteCard from "./NoteCard";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Tooltip from '@material-ui/core/Tooltip'; 
import EqualizerIcon from '@material-ui/icons/Equalizer';





const FlippyItems = ({frontSide, backSide, handleStudentList, stats, index, quiz}) => {
    const [lockFlip, setlockFlip] = useState(true)
    return (
        <Flippy
        // onmouseover={onMouseOver}
        className="col-xs-12 col-sm-12 col-md-4 col-lg-3"
        flipOnHover={true} // default false
        flipOnClick={false} // default false
        flipDirection="horizontal" // horizontal or vertical
        // ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div
        style={{ minWidth: '260px', height: '150px', marginBottom : "25px", marginRight : "25px"}} /// these are optional style, it is not necessary
      >
        <FrontSide
          style={{
            // backgroundColor: '#41669d',
            padding: 0,
            margin:0
          }}
        // animationDuration="2000"
        >
          {frontSide}
        </FrontSide>
        <BackSide
          style={{ 
            backgroundColor: '#4257b2',
            padding: 2,
            margin:0}}
          // animationDuration="2000"
        >

          <div key={index}  > 
              
              <NoteCard 
              note={quiz.quiz_title}  
              handleDelete={"no delete"} 
              color={'#4257b2'} 
              avatar="no avatar" 
              content={
                  <div style={{float:"right", color:"#4257b2"}}> 
                  <Tooltip title="Cliquez pour les statistiques">
                      <IconButton  onClick={stats} style={{float:"right", color:"#4257b2"}}>
                          <EqualizerIcon />
                      </IconButton>
                  </Tooltip>
                  <Tooltip title="Liste des étudiants">
                      <IconButton  onClick={handleStudentList} style={{float:"right", color:"#4257b2"}}>
                          <FormatListNumberedIcon />
                      </IconButton>
                  </Tooltip>

                  </div> 
              }
              />
          </div> 
        </BackSide>
      </Flippy>
    )
}

export default FlippyItems
