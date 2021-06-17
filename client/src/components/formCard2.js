import React from 'react';
import Card from '@material-ui/core/Card';



export default function FormCard2({content, float}) {
  return (
    <Card style={{ height: "850px", maxHeight:"900", width: "100%", backgroundImage: `url(${"/blueBG.png"})`, maxWidth:"890px",  margin: "auto", marginTop:"70px"}}
    >
      <div style={{backgroundColor: "white",height: "100%",  minWidth:"300px", maxWidth:"600px", maxHeight:"770px" , width: "100%",  margin:"auto", marginTop: "40px",}}>
            {content}
      </div>
    </Card>
  );
}