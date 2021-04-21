import '../pagination.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@material-ui/core';
import { useState } from 'react';

export const Paginate = ({allStudents, getAllQuizzes}) => {
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)


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
        <div>
            <List>
                {allStudents && allStudents.slice(start, end).map((student) => (
                    <ListItem key={student.email} button onClick={() => getAllQuizzes(student.email,student.firstname +' ' +student.lastname)}>
                        <ListItemAvatar>
                            <Avatar>
                                {(student.firstname[0] + ' ' + student.lastname[0]).toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<h4>{student.firstname +' ' +student.lastname}</h4>}/>
                    </ListItem>
                ))}
            </List>
            <div className="button-container">
                <Button size="small" style={{backgroundColor: "transparent", color: "#4257b2", textTransform:"none"}} startIcon={ <FaChevronLeft />} className="prev-btn" onClick={prevStudent}>
                   Previous
                </Button>
                <Button size="small" style={{backgroundColor: "transparent", color: "#4257b2", textTransform: "none"}} endIcon={<FaChevronRight />} className="next-btn" onClick={nextStudent}>
                    Next
                </Button>
            </div>
        </div>
    )
}
