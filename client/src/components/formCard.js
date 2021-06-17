import React from 'react';
import Card from '@material-ui/core/Card';



export default function FormCard({content, float}) {


  return (
    <Card style={{  width: "100%", backgroundImage: `url(${"/blueBG.png"})`, maxWidth:"890px",  margin: "auto", marginTop:"70px"}}
    >
      <div style={{backgroundColor: "white", height: "100%",  maxWidth:"480px", minWidth:"300px", float: float}}>
            {content}
      </div>
    </Card>
  );
}
