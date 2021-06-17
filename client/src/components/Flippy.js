import React from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const FlippyItems = ({frontSide, backSide}) => {
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
        >
          {frontSide}
        </FrontSide>
        <BackSide
          style={{ 
            backgroundColor: '#4257b2',
            padding: 2,
            margin:0}}
        >
        <div> 
          {backSide}  
        </div> 
        </BackSide>
      </Flippy>
    )
}

export default FlippyItems
