import React from 'react';
import '../paginate.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, IconButton } from '@material-ui/core';
import { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));


export const Paginate = ({allStudents, getAllQuizzes, allQuizzes, displayQuizzes, setActiveQuiz, evolution}) => {
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const prevStudent = () => {
        setStart((old) => {
            let newStart = old - 10
            if(newStart < 0){
                return allStudents.length - 10
            }
            else{
                return newStart
            }
        })
        setEnd((old) => {
            let newEnd = old - 10
            if((start - 10) < 0){
                return allStudents.length
            }
            else{
                return newEnd
            }
        })
    }
    const nextStudent = () => {
        setStart((old) => {
            let newStart = old + 10
            if(newStart >= allStudents.length){
                return 0
            }
            else{
                return newStart
            }
        })
        setEnd((old) => {
            let newEnd = old + 10
            if((start + 10) >= allStudents.length) {
                return 10
            }
            else{
                return newEnd
            }
        })
    }


    return (
        // {(allQuizzes && displayQuizzes) &00p0& (
        //     <div >
        //         <h4>{'Questionnaires auxquels ont répondu : '}</h4>
        //         <h4> {currentStudent}</h4>
        //         <div className={`quiz`} style={{borderRadius: "10px"}}>
        //             <List>
        //             {allQuizzes && allQuizzes.map((quiz, index) => (
        //                 <ListItem button onClick= {() => setActiveQuiz(quiz, index)}>
        //                     <ListItemIcon>
        //                         <BookOutlined />
        //                     </ListItemIcon>
        //                     <ListItemText primary={
        //                         <h4>
        //                         {quiz.quiz_id} 
        //                         </h4>
        //                     }/>
        //                 </ListItem>
        //             ))}
        //             </List>
        //         </div>
        //     </div>
        // ) }
        

        <div className={classes.root}>
            {allStudents && allStudents.slice(start, end).map((student, index) => (
                <Accordion expanded={expanded === `panel${index + 0}`} onChange={handleChange(`panel${index + 0}`)} onClick={()=> getAllQuizzes(student.email,student.firstname +' ' +student.lastname )}>
                    <AccordionSummary
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        expandIcon={<ExpandMore style={{color: "#4257b2"}} />}
                    >
                        <Avatar style={{fontSize: "0.8rem", backgroundColor: "#4257b2"}}>
                            {(student.firstname[0] +' ' + student.lastname[0]).toUpperCase()}
                        </Avatar>
                        <Typography  style={{marginLeft: "15px"}} variant="h6">{student.firstname +' ' +student.lastname}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {(allQuizzes && displayQuizzes) && (
                            <div style={{display: "flex"}}>
                                {allQuizzes && allQuizzes.map((quiz, index) => (
                                    <Tooltip title="show evolution">
                                        <Chip  style={{marginLeft: "5px"}} label={quiz.quiz_id} onMouseOver= {() => setActiveQuiz(quiz, index)} onClick={()=> evolution()}/>
                                    </Tooltip>
                                ))}
                            </div>
                        )}
                        {(displayQuizzes === false) && (
                            <Typography>Cet étudiant n'a répondu à aucun quiz</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>
                // <ListItem key={student.email} button onClick={() => getAllQuizzes(student.email,student.firstname +' ' +student.lastname)}>
                //     <ListItemAvatar>
                //         
                //     </ListItemAvatar>
                //     <ListItemText primary={<h4>{student.firstname +' ' +student.lastname}</h4>}/>
                // </ListItem>
            ))}
        
            <div className="button-container">
                <Button size="small" style={{backgroundColor: "transparent", color: "#4257b2"}} startIcon={ <FaChevronLeft />} className="prev-btn" onClick={prevStudent}>
                    Précédent
                </Button>
                <Button size="small" style={{backgroundColor: "transparent", color: "#4257b2"}} endIcon={<FaChevronRight />} className="next-btn" onClick={nextStudent}>
                    Suivant
                </Button>
            </div>
        </div>
    )
}