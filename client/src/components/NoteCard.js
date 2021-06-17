import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, IconButton,  Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';


const NoteCard = ({ note, handleDelete,color, avatar, subHeader, content, mouseover }) => {
    return ( 
        <div>
           <Card elevation={1} style={{ padding: "20px", "margin-bottom": "10px"}} onMouseOver={mouseover ? (mouseover) : ("")} >
               <CardHeader
                    avatar={ avatar === "no avatar" ? ("") :
                        (<Avatar  style={{backgroundColor: color}}>
                            {note[0].toUpperCase()}
                        </Avatar>)
                }
                    action={ handleDelete==="no delete" ? ("") :
                        (<IconButton style={{color: "#4257b2"}}>
                            <DeleteOutlined />
                        </IconButton>)
                    }
                    title={note}
                    // subheader={note}
               />
               <CardContent>
                   <Typography variant="body2" color="textSecondary">
                       {content ? (content) :((note.length > 10) ? note.substring(10) : note)}
                   </Typography>
               </CardContent>
           </Card>
        </div>
     );
}
 
export default NoteCard;