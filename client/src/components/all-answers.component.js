import {useState, useEffect} from 'react';
import Axios from 'axios';
import {FaTimes} from 'react-icons/fa'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import BarChart from './BarChart';
import { Button, Container, List, ListItem, ListItemText } from '@material-ui/core';
import DoughnutChart from './DoughnutChart';

const AllAnswers = () => {
    const [allAnswers, setallAnswers] = useState([]);
    const [currentQuiz, setcurrentQuiz] = useState(null);
    const [array, setarray] = useState(null);
    const [answersArray, setanswersArray] = useState();
    const [explanationsArray, setexplanationsArray] = useState()
    const [currentStudent, setcurrentStudent] = useState(null)
    const [explanationStats, setexplanationStats] = useState(null)

    // FIND ALL ANSWERED QUESTIONS ON PAGE LOAD
    useEffect(() => {
        Axios.get('https://neuroeducation-feedback.herokuapp.com/api/findAllAnswered').then((response) => {
          console.log(response.data);
          setallAnswers(response.data) 
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    // SET SELECTED(CLICKED) QUIZ
    const setActiveQuiz = (quiz, index, quiz_id) => {
        console.log(quiz)
        setcurrentQuiz(quiz);
        getStats(quiz_id);
        setcurrentStudent(null);
        setexplanationStats(null);
        setarray(null);
    }; 

    // RETRIEVE GROUPPED DATA FROM THE DATABASE BY SELECTED QUIZ ID 
    const getStats = (quiz_id) => {
        Axios.get(`https://neuroeducation-feedback.herokuapp.com/api/groupStats/${quiz_id}`)
        .then(response => {
            if(response){
            // SET GROUPPED ANSWERS "FOR EACH STUDENT" ARRAY
            setanswersArray(response.data[0]._id.answer);
            console.log(response.data[0]._id.answer)

            // SET GROUPPED EXPLANATIONS "FOR EACH STUDENT" ARRAY
            setexplanationsArray(response.data[0]._id.explanation);
            console.log(response.data[0]._id.explanation)
            }
        })
        .catch()
    }

    // SET SELECTED(CLICKED) STUDENT ARRAY
    const setActiveStudent = (student) => {
        console.log(student)
        setcurrentStudent(student);
    }

    // MERGE ALL ANSWERS BY QUESTION NUMBER AND SET COUNT AND STATS
    const stats = () => {
        // MERGE ALL ANSWERS INTO AN ARRAY (arrAns)
        const arrayAns = answersArray[0].map(function(value, index) {
            const mergeAllStudentsByIndex = [value];
            if(value){
                for(let i=1; i<answersArray.length; i++){
                    mergeAllStudentsByIndex.push(answersArray[i][index])
                }
            }
            console.log(mergeAllStudentsByIndex);
            return mergeAllStudentsByIndex;
        });
        console.log(arrayAns);

         // MERGE ALL EXPLANATIONS INTO AN ARRAY (arrExp)
        const arrayExp = explanationsArray[0].map(function(explanation, index) {
            const mergeAllExplanation = [explanation];
            if(explanation){
                for(let i =1; i< explanationsArray.length; i++){
                    mergeAllExplanation.push(explanationsArray[i][index])
                }
            }

            return mergeAllExplanation;
        });
        console.log(arrayExp)
        
        // COUNT NUMBER OF OCCURRENCE OF AN ANSWER("Plutot Oui", "Non"... etc) FOR EACH QUESTION
        const countAnswers = arrayAns.map((answers, index) => {
            console.log(array)
            let all = {
                "Oui" : 0,
                "Plutot Oui" : 0,
                "Plutot Non" : 0,
                "Non": 0,
            };
            for(const answer of answers){
                all = {...all,  [answer] : answers.filter((a) => {return a === answer}).length}
            }
            return all;
        })
        // SET COUNT AS A STATE
        setarray(countAnswers)

        // COUNT NUMBER OF OCCURRENCE OF AN EXPLANATION("a", "b", "c"... etc) FOR EACH QUESTION
        const countExplanations = arrayExp.map((array,index) => {
            //return arr.filter((a) => {return a === "a"}).length
            console.log(array)
            let all = {
                a : 0,
                b : 0,
                c : 0,
                d : 0,
                e : 0
            }
            for(const letter of array){
                all = {...all,  [letter] : array.filter((a) => {return a === letter}).length}
            }
            return all;
        })
        // SET COUNT AS A STATE
        setexplanationStats(countExplanations);
        
    }

    // RETRIEVE INTEGERS(VALUES) FOR EXPLANATIONS
    const getExplanationValues = (explanation, keys) => {
        let values = [];
        keys.forEach(key => {
            values.push(explanation[key])
        })
        return values;
    }
    // RETRIEVE INTEGERS(VALUES) FOR Y, MY, MN, N QUESTIONS
    const getAnswerValues = (answer, keys) => {
        let values = [];
        keys.forEach(key => {
            values.push(answer[key])
        })
        return values;
    }

    //RETRIEVE KEYS(LABELS) FOR CHART DATA
    const getLabels = object => {
        return Object.keys(object);
    }

    const disp = () => {
        console.log(array);
        console.log(explanationStats)
    }



    return (
        <div className="container-questions">
            <h4>All Answered List</h4>

            <div className={`quiz`} style={{borderRadius: "10px"}}>
                <List>
                    {allAnswers && allAnswers.map((quiz, index) => (
                        <ListItem button >
                            <ListItemText primary={
                                 <h4 
                                 onClick= {() => setActiveQuiz(quiz, index, quiz.quiz_id)}
                                 > {quiz.quiz_title} {''} 
                                     <FaTimes 
                                         style={{color: 'red', cursor: 'pointer'}}
                                         //  onClick={() => onDelete(quiz._id)}
                                     />
                                 </h4>
                            } />
                           
                        </ListItem>
                    ))}
                </List>
            </div>

            <div>
                {currentQuiz ? (
                    <div>
                        <center><h4>{'You Selected Quiz : '}{currentQuiz.quiz_id}</h4></center>
                        
                        <div >
                            <h4>{'Student List : '}</h4>
                            {currentQuiz.quiz_answers && currentQuiz.quiz_answers.map((students, index) => (
                                <div>
                                    <h4 onClick={() => setActiveStudent(students)}>{students.student_id}</h4>
                                </div>
                            ))}
                        </div>

                        <div>
                            {currentStudent && (
                                <div>
                                    <h4>{'Showing Answers of  : '}{currentStudent.student_id}</h4>
                                    {currentStudent && currentStudent.student_answers.map((answers, index) => (
                                        <div> 
                                            <h4>{answers.question_answer_id}{' .'}{answers.answer}</h4>
                                            <h4>{'Explanation : '}{answers.explanation}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={{marginBottom: "20px"}}>
                            <Button disableElevation variant="contained" onClick={disp}>Log</Button> <span></span>
                            <Button disableElevation variant="contained" onClick={stats}>Click for Stats</Button>
                        </div>
                        <Container>
                            {array && (
                                <div>
                                    <Grid container spacing={3}>
                                        {array && array.map((answer, index) => (
                                            <Grid item sm={12} md={6} lg={4} >
                                                <Card elevation={2}>
                                                    <CardHeader
                                                        action={
                                                            <IconButton>
                                                                <MoreVert />
                                                            </IconButton>
                                                        }
                                                        title="Graphique en anneau"
                                                        subheader={"Question. " + (index + 1)} 
                                                    />
                                                    <CardContent>
                                                        <DoughnutChart labels={getLabels(answer)} answerValues={getAnswerValues(answer, getLabels(answer))} />
                                                    </CardContent>
                                                </Card>
                                            </Grid>

                                        ))}
                                    </Grid>
                                </div>
                                                        
                                ) }

                            {explanationStats && (
                                <div>
                                        <Grid container spacing={3} >
                                            {explanationStats && explanationStats.map((explanation, index) => (
                                                <Grid item sm={12} md={6} lg={4}>
                                                    <Card elevation={2}>
                                                        <CardHeader
                                                        action={
                                                            <IconButton>
                                                                <MoreVert/>
                                                            </IconButton>
                                                        } 
                                                        title="Diagramme à bandes"
                                                        subheader={`Question. ${index + 1}`}
                                                        />
                                                        <CardContent>
                                                            <BarChart explanationLabels={getLabels(explanation)} explanationValues={getExplanationValues(explanation, getLabels(explanation))} />
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                </div>         
                                )}
                        </Container>    
                    </div>
                ) : (<h4>Please Select A Quiz to view Answers</h4>)}
            </div>   
        </div>
    )
}

export default AllAnswers;