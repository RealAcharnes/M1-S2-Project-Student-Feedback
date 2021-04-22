import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, IconButton, makeStyles, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { blue, green, pink, yellow } from '@material-ui/core/colors';

// const useStyles = makeStyles({
//     // test: {
//     //     border: (note) => {
//     //         if(note.category === 'work'){
//     //             return '1px solid red'
//     //         }
//     //     }
//     // }
//     avatar: {
//         backgroundColor: (note) => {
//             switch(note.category){
//                 case 'work':
//                     return yellow[700] //here, we are returning a color, like 'red' or '#f3f3f3', not a material ui color object like we did in App.js, so we use the square brackets[] to give the kind of shade we want. This will return a particular kind of color and not the entire material ui color component(like in App.js)
//                     break
//                 case 'money':
//                     return green[500]
//                     break
//                 case 'todos':
//                     return pink[500]
//                     break
//                 default:
//                     return blue[500]
//             }
//         }
//     }
// })



const NoteCard = ({ note, handleDelete,color, avatar, subHeader, content, mouseover }) => {
    // const classes = useStyles(note) //to have dynamic styles based on a certain value, you can pass that value as a parameter to the useStyles() hook.
      //GENERATE RANDON COLORS
//   const generateColors = () => {
//     const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
//     return randomColor;

//   }
    // let trim;
    // if(note.length<10) {
    //     trim = note.substring(0, 10)
    // }
    // else if(note.length===11 || note.length===12){
    //     trim = note.substring(0, 12)
    // }
    // else{
    //     trim = note.substring(0, 10)+"..."
    // }

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