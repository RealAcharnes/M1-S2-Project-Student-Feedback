import {useState, useEffect} from 'react';
import axios from 'axios';
import { Avatar, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import BookOutlined from '@material-ui/icons/BookOutlined';


const AllStudents = () => {
    const [allStudents, setallStudents] = useState([]);
    const [allQuizzes, setallQuizzes] = useState(null)
    const [message, setmessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('')
    const [successful, setsuccessful] = useState(false);
    const [displayQuizzes, setdisplayQuizzes] = useState(null);
    const [displayActiveQuiz, setdisplayActiveQuiz] = useState(false)
    const [displayEvolution, setdisplayEvolution] = useState(false);
    const [displayMain, setdisplayMain] = useState(true);
    const [currentStudent, setcurrentStudent] = useState(null);
    const [currentQuiz, setcurrentQuiz] = useState(null);
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
        setcurrentQuiz(null);
        setallQuizzes([]);
        setdisplayQuizzes(null) 
        axios.get(`https://neuroeducation-feedback.herokuapp.com/api/studentQuizzes/${student_id}`).then((response) => {
            console.log(response.data.quizzes);
            if((response.data.quizzes).length ){
                setallQuizzes(response.data.quizzes)
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
    console.log(quiz);
    setdisplayActiveQuiz(true);
    setcurrentQuiz(quiz);
    setdisplayQuizzes(null);
    // setcurrentIndex(index)
  };

  const setActiveStudent = (name) => {
    console.log(name)
    setcurrentStudent(name);
    // setcurrentQuiz(quiz);
    // setcurrentIndex(index)
  };

  const backToAllQuizzes = () => {
    setdisplayQuizzes(true);
    setdisplayActiveQuiz(false);
  }

  const evolution = () => {
    if(displayMain===true && displayEvolution===false){
        setdisplayMain(false); 
        setdisplayEvolution(true);
    } 
    else if(displayMain===false && displayEvolution===true){
        setdisplayMain(true); 
        setdisplayEvolution(false);
    } 


  }

    return (
        <div className="container-questions">
            {displayMain  && <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6">
                    <h3>{'Liste des étudiants : '}</h3>
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
                            <h4>{'Questionnaires auxquels ont répondu : '}</h4>
                            <h4> {currentStudent}</h4>
                            <div className={`quiz`} style={{borderRadius: "10px"}}>
                                <List>
                                {allQuizzes && allQuizzes.map((quiz, index) => (
                                    <ListItem button>
                                        <ListItemIcon>
                                            <BookOutlined />
                                        </ListItemIcon>
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
                            <h4>{'Questionnaires auxquels ont répondu : '}</h4>
                            <h4> {currentStudent}</h4>
                            <div className={`quiz`} style={{borderRadius: "10px"}}>
                                <h4>Cet étudiant n'a répondu à aucun quiz</h4>
                            </div>
                        </div>
                    
                    )}
                    <div >
                    {(currentQuiz && displayActiveQuiz) && 
                        <div className={`quiz`} style={{borderRadius: "10px"}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <BookOutlined />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <h4>
                                    {currentQuiz.quiz_id} 
                                    </h4>
                                }/>
                            </ListItem>
                            <h4>{currentStudent+' has taken this quiz '+ (currentQuiz.quiz_answers.length) +' times'}</h4>
                            <button className="btnn" onClick={()=> backToAllQuizzes()}>Back</button>
                            <button className="btnn" onClick={()=> evolution()}>{'View Answers & Evolution'}</button>
                        </div>
                    }
                        

                </div> 
                </div>

     
            </div>
            }
            <div>
                { (currentQuiz && displayEvolution) && <button className="btnn" onClick={()=> evolution()}>Back</button>}
                <div className="row">
                    
                    {(currentQuiz && displayEvolution) && currentQuiz.quiz_answers.map((quiz, index)=>(                            
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className={`quiz`} style={{borderRadius: "10px"}}>
                                <h4>{'Attempt number ' + (index+1)}</h4>
                                {/* <h4>{quiz.qu}</h4> */}
                                {quiz.student_answers.map((answers, idx)=>(
                                    <div>
                                    <h4>{'Question '+answers.question_answer_id}</h4>
                                    <h4>{'answer: ' +answers.answer +' explanation: ' +answers.explanation}</h4>
                                    </div>
                                ))}
                            </div>    
                        </div> 
                                
                    ))}
                </div>
            </div>    
        </div>
    )
}

export default AllStudents
