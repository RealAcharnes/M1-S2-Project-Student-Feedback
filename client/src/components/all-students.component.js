import {useState, useEffect} from 'react';
import axios from 'axios';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';


const AllStudents = () => {
    const [allStudents, setallStudents] = useState([]);
    const [allQuizzes, setallQuizzes] = useState(null)
    const [message, setmessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('')
    const [successful, setsuccessful] = useState(false);
    const [displayQuizzes, setdisplayQuizzes] = useState(null)
    const [currentStudent, setcurrentStudent] = useState(null)
    const [showSpinner, setShowSpinner] = useState(true);


    useEffect(() => {
        axios.get( "https://neuroeducation-feedback.herokuapp.com/api/findAllStudents")
        .then(res => {
            console.log(res.data);
            setallStudents(res.data);
            setShowSpinner(false);
        })
        .catch(error => {
            const resMessage =
            (error.response && error.response.data && error.response.data.message) 
            || error.message || error.toString();
  
            seterrorMessage(resMessage);
        });

    }, [])

    const getAllQuizzes = (student_id, name) => {
        setallQuizzes([]);
        setdisplayQuizzes(null) 
        axios.get(`https://neuroeducation-feedback.herokuapp.com/api/studentQuizzes/${student_id}`).then((response) => {
            console.log(response.data);
            if((response.data).length ){
                setallQuizzes(response.data)
                setdisplayQuizzes(true); 
            }
            else{
                setallQuizzes(null)
                setdisplayQuizzes(false)  
            }
            setActiveStudent(name);
          })
          .catch(function (err) {
              seterrorMessage(err.response.data.message|| err.response.data.message[0].error);
          });
    }

      // SET SELECTED(CLICKED) QUIZ
  const setActiveQuiz = (quiz, index) => {
    console.log(quiz)
    // setcurrentQuiz(quiz);
    // setcurrentIndex(index)
  };

  const setActiveStudent = (name) => {
    console.log(name)
    setcurrentStudent(name);
    // setcurrentQuiz(quiz);
    // setcurrentIndex(index)
  };

    return (
        <div className="container-questions">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6">
                    <h3>{'Students List : '}</h3>
                    {showSpinner && (<div class="spinner">
                        <div></div>
                        <div></div>
                    </div>)}
                    {!showSpinner && (<div  class="quiz" style={{borderRadius: "10px"}}>
                            <List>
                                {allStudents && allStudents.map((student,index) =>(
                                    <ListItem button onClick={()=> getAllQuizzes(student.email,student.firstname +' ' +student.lastname )}>
                                        <ListItemAvatar>
                                            <Avatar>
                                            {(student.firstname[0] +' ' +student.lastname[0]).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={<h4>{student.firstname +' ' +student.lastname}</h4>} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>)}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6">  
                    {(allQuizzes && displayQuizzes) && (
                        <div >
                            <h4>{'Quizzes Answered by : '}</h4>
                            <h4> {currentStudent}</h4>
                            <div className={`quiz`} style={{borderRadius: "10px"}}>
                                <List>
                                {allQuizzes && allQuizzes.map((quiz, index) => (
                                    <ListItem button>
                                        <ListItemText primary={
                                            <h4 
                                            onClick= {() => setActiveQuiz(quiz, index)}
                                            >
                                            {quiz.quiz_id} 
                                            </h4>
                                        }/>
                                    </ListItem>
                                ))}
                                </List>
                            </div>
                        </div>
                    ) }
                    {(displayQuizzes===false) && (
                        <div>
                            <h4>{'Quizzes Answered by : '}</h4>
                            <h4> {currentStudent}</h4>
                            <div className={`quiz`} style={{borderRadius: "10px"}}>
                                <h4>This student has not taken any quiz</h4>
                            </div>
                        </div>
                    
                    )}
                </div>      
            </div>
        </div>
    )
}

export default AllStudents
