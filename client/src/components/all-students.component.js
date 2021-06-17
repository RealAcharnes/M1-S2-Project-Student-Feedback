import {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@material-ui/core';
import LineChart from './LineChart';
import LineLabels from './LineLabels';
import SearchService from "../services/search.service";
import {Paginate} from './Paginate';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';




const AllStudents = () => {
    const [allStudents, setallStudents] = useState([]);
    const [allQuizzes, setallQuizzes] = useState(null)
    // const [message, setmessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('')
    // const [successful, setsuccessful] = useState(false);
    const [displayQuizzes, setdisplayQuizzes] = useState(null);
    const [displayActiveQuiz, setdisplayActiveQuiz] = useState(false)
    const [displayEvolution, setdisplayEvolution] = useState(false);
    const [displayMain, setdisplayMain] = useState(true);
    const [currentStudent, setcurrentStudent] = useState(null);
    const [currentQuiz, setcurrentQuiz] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);
    const [lineArray, setLineArray] = useState([]);
    const [displayLineChart, setDisplayLineChart] = useState(false);
    const [actualQuiz, setactualQuiz] = useState([]);

    useEffect(() => {
        axios.get( "https://neuroeducation-feedback.herokuapp.com/api/findAllStudents")
        .then(res => {
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
        // setdisplayActiveQuiz(true);
        setcurrentQuiz(quiz);
        let tempLineArray = [];
        quiz.quiz_answers.forEach((quiz, index) => {
            tempLineArray.push(getAllAns(quiz))
        })
        setLineArray(tempLineArray)

        // GET ACTUAL QUESTIONS FROM DATABASE
        SearchService.searchQuiz(
            quiz.quiz_id,
        ).then(
            response => {
            setactualQuiz(response.data);
            })
            .catch(
            error => {
            const resMessage =
                (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();

            console.log(resMessage);

            }
        );
  };

    const setActiveStudent = (name) => {
        setcurrentStudent(name);
    };


    const evolution = () => {
        if(displayMain===true && displayEvolution===false){
            setdisplayMain(false); 
            setdisplayEvolution(true);
            setDisplayLineChart(true);
        } 
        else if(displayMain===false && displayEvolution===true){
            setdisplayMain(true); 
            setdisplayEvolution(false);
            setDisplayLineChart(false);
        } 


    }

    // CREATE ARRAY CONTAINING ANSWERS OF EACH ATTEMPT
    const getAllAns = quiz => {
        let array = []
        quiz.student_answers.forEach(answers=> {
            switch(answers.answer){
                case "Non":
                    array.push(1)
                    break
                case "Plutot Non":
                    array.push(2)
                    break
                case "Plutot Oui":
                    array.push(3)
                    break
                default:
                    array.push(4)
                    break
            }
        })
        return array
    }

    //GENERATE DATA VALUES FOR LINE CHART 
    const getLineData = (groupArray, index) => {
        let dataArray = []
        groupArray.forEach((item) => {
            dataArray.push(item[index])
        })
        return dataArray
    }

 
 

    return (
    
        <div className="container-questions">
            {errorMessage ? (
                <div className="form-group">
                    <div
                    className={ "alert alert-danger"}
                    role="alert"
                    >
                    {errorMessage}
                    </div>
                </div>
            ):(
                <div>
                    {displayMain  && <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <Typography
                                style={{textAlign: "center", color:"#4257b2"}}
                                variant="h5"
                            >
                                {'Liste des étudiants '}
                                <div className="underline"></div>
                            </Typography>
                           
                            {showSpinner && (<div class="spinner">
                                <div></div>
                                <div></div>
                            </div>)}
                            {!showSpinner && (<div  class="quiz" style={{borderRadius: "10px"}}>
                                    <Paginate 
                                        allStudents={allStudents}
                                        getAllQuizzes={getAllQuizzes}
                                        allQuizzes={allQuizzes}
                                        displayQuizzes={displayQuizzes}
                                        setActiveQuiz={setActiveQuiz}
                                        evolution={evolution}
                                    />
                                </div>)}

                        </div>            
                    </div>
                    }
                    <div>                        
                        {displayLineChart && (
                            <div>
                             <IconButton  onClick={()=>evolution()} style={{float:"left", color:"#4257b2"}}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Grid container spacing={3}>
                                {(lineArray.length && displayLineChart) && lineArray[0].map((attempt, index) => (
                                    <Grid item md={6} sm={12} lg={4} >
                                        <Card elevation={2}>
                                            <CardHeader
                                                title={<Typography style={{fontSize: "1rem"}} color="textSecondary" variant="h6" component="p">{actualQuiz ? (`Q${index + 1}. `+actualQuiz.questions[index].question_title) : (`Question ${index + 1}`)}</Typography>}
                                                subheader={<div style={{fontSize: "0.8rem"}}>Oui-4 Plutot Oui-3 Plutot Non-2 Non-1</div>}
                                            />
                                            <CardContent>
                                                <LineChart labels={LineLabels(lineArray.length)} data={getLineData(lineArray, index)} />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            </div>
                           
                        )}
                    </div>    
                </div>)}
        </div>
    )
}

export default AllStudents
