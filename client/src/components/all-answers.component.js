import {useState, useEffect} from 'react';
import Axios from 'axios';
// import {FaTimes} from 'react-icons/fa'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SwapHorizRounded from '@material-ui/icons/SwapHorizRounded';import BarChart from './BarChart';
import { Container, List, ListItem, ListItemText} from '@material-ui/core';
import DoughnutChart from './DoughnutChart';
import BookOutlined from '@material-ui/icons/BookOutlined';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NoteCard from "./NoteCard";
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchService from "../services/search.service";
import { Avatar, Typography } from '@material-ui/core';
import {Title} from './Title';



import FlippyItems from './Flippy';



const AllAnswers = () => {
    const [allAnswers, setallAnswers] = useState([]);
    const [currentQuiz, setcurrentQuiz] = useState(null);
    const [array, setarray] = useState(null);
    const [answersArray, setanswersArray] = useState();
    const [explanationsArray, setexplanationsArray] = useState()
    const [currentStudent, setcurrentStudent] = useState(null)
    const [explanationStats, setexplanationStats] = useState(null)
    const [showSpinner, setShowSpinner] = useState(true);
    const [allQuestions, setAllQuestions] = useState([]);
    const [allExplanations, setAllExplanations] = useState([]);
    const [pieData, setPieData] = useState("Doughnut");
    const [barData, setBarData] = useState("Bar");
    const [pieTitle, setPieTitle] = useState("Graphique en anneau");
    const [barTitle, setBarTitle] = useState("Diagramme à bandes");
    const [displayAllQuizzes, setdisplayAllQuizzes] = useState(true);
    const [displayStudentList, setdisplayStudentList] = useState(false);
    const [displayStats, setdisplayStats] = useState(false)
    const [actualQuiz, setactualQuiz] = useState(null)


    // FIND ALL ANSWERED QUESTIONS ON PAGE LOAD
    useEffect(() => {
        Axios.get('https://neuroeducation-feedback.herokuapp.com/api/findAllAnswered').then((response) => {
          console.log(response.data);
          setallAnswers(response.data);
          setShowSpinner(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    //ALTERNATE BETWEEN PIE AND DOUGHNUT CHART

    const handlePieChartChange = () => {
        if(pieData === "Doughnut"){
            setPieData("Pie")
            setPieTitle("Diagramme circulaire")
        }
        if(pieData === "Pie"){
            setPieData("Doughnut")
            setPieTitle("Graphique en anneau")
        }
    }
    const handleBarChartChange = () => {
        if(barData === "Bar"){
            setBarData("Horizontal Bar")
            setBarTitle("Graphique à barres horizontales")
        }
        if(barData === "Horizontal Bar"){
            setBarData("Bar")
            setBarTitle("Diagramme à bandes")
        }
    }

    // SET SELECTED(CLICKED) QUIZ
    const setActiveQuiz = (quiz, index, quiz_id) => {
        console.log(quiz_id)
        setcurrentQuiz(quiz);
        getStats(quiz_id);
        setcurrentStudent(null);
        setexplanationStats(null);
        setarray(null);

        Axios.get(`https://neuroeducation-feedback.herokuapp.com/api/searchQuiz/${quiz_id}`)
        .then(response => {
            setAllQuestions(response.data.questions);
            console.log(response.data.questions);
        })
        .catch(err => {
            console.log("An error occurred", err.response);
        })


        // GET ACTUAL QUESTIONS FROM DATABASE
        SearchService.searchQuiz(
            quiz.quiz_id,
        ).then(
            response => {
            console.log(response.data);
            //   setsuccessful(true);
            setactualQuiz(response.data);
            })
            .catch(
            error => {
            console.log(error.response);
            const resMessage =
                (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();

            //   setmessage(resMessage);
            //   setsuccessful(false);
            }
        );
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

// HANDLE STUDENT LIST
    const handleStudentList = () => {
        setdisplayAllQuizzes(false)
        setdisplayStudentList(true)
        setdisplayStats(false)
    }

    const backToQuizzes = () => {
        setdisplayAllQuizzes(true)
        setdisplayStudentList(false)
        setdisplayStats(false)
        setcurrentQuiz(null)
        setcurrentStudent(null);
        setexplanationStats(null);
        setarray(null);
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

        // GET EXPLANATIONS OF ALL QUESTIONS FOR THE CHART DISPLAY 
        const labelsArray = allQuestions.map((value, index) => {
            const myArray = value.question_options.map((value, index) => {
                return value.options_text;
            })
            return myArray
        })

        setAllExplanations(labelsArray);
        console.log(labelsArray);

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
        setdisplayStats(true)
        setdisplayStudentList(false)
        setdisplayAllQuizzes(false)    
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

    // const disp = () => {
    //     console.log(array);
    //     console.log(explanationStats)
    // }



    return (
        <div className="container-questions">
            {showSpinner && <div class="spinner">
                <div></div>
                <div></div>
            </div>
            }
            {!showSpinner &&  displayAllQuizzes && (<div  style={{borderRadius: "10px"}}>
                <div >      
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <Title data="Liste de toutes les réponses" />
                    <div className="row" >
                        {allAnswers && allAnswers.map((quiz, index) => (
                            <FlippyItems     
                                frontSide={
                                    <div key={index}  > 
                                        <Card 
                                        elevation={1} 
                                        style={{ padding: "20px", "margin-bottom": "10px"}}
                                        onMouseOver={() => setActiveQuiz(quiz, index, quiz.quiz_id)}
                                        >
                                            <CardHeader
                                                avatar={
                                                    (<Avatar  style={{backgroundColor: "#4257b2"}}>
                                                        {quiz.quiz_id[0].toUpperCase()}
                                                    </Avatar>)
                                                }
                                                title={quiz.quiz_id}
                                                // subheader={note}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    {(quiz.quiz_title).substr(0,27) + "..."}
                                                </Typography>
                                            </CardContent>
                                        </Card>

                                </div> 
                                }
                            // handleStudentList = {()=>handleStudentList()}
                            // stats={()=>stats()}
                            // index={index}
                            // quiz={quiz}
                                backSide={
                                    <div key={index}  > 
                                        <Card elevation={1} style={{ padding: "20px", "margin-bottom": "10px"}}  >
                                            <CardHeader
                                                avatar={
                                                    (<Avatar  style={{backgroundColor: "#4257b2"}}>
                                                        {quiz.quiz_id[0].toUpperCase()}
                                                    </Avatar>)
                                                }
                                                title={(quiz.quiz_title)}
                                                // subheader={note}
                                            />
                                            <CardContent>
                                                <div style={{float:"right", color:"#4257b2"}}> 
                                                    <Tooltip title="Cliquez pour les statistiques">
                                                        <IconButton  onClick={stats} style={{float:"right", color:"#4257b2"}}>
                                                            <EqualizerIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Liste des étudiants">
                                                        <IconButton  onClick={handleStudentList} style={{float:"right", color:"#4257b2"}}>
                                                            <FormatListNumberedIcon />
                                                        </IconButton>
                                                    </Tooltip>

                                                </div>
                                            </CardContent>
                                        </Card>
                                </div> 
                                }
                            />
                        ))}
                    </div>
                    </div>
                </div>
                {/* <List>
                    {allAnswers && allAnswers.map((quiz, index) => (
                        <ListItem button onClick= {() => setActiveQuiz(quiz, index, quiz.quiz_id)} >
                            <ListItemIcon>
                                <BookOutlined />
                            </ListItemIcon>
                            <ListItemText primary={
                                 <h4> 
                                     {quiz.quiz_title} {''} 
                                 </h4>
                            } />
                        </ListItem>
                    ))}
                </List> */}
            </div>)}

            <div>
                {currentQuiz && (displayStudentList || displayStats) ? (
                    <div>
                        <IconButton  onClick={()=>backToQuizzes()} style={{float:"left", color:"#4257b2"}}>
                        <ArrowBackIcon />
                        </IconButton>
                        <center><Title data={'Vous avez sélectionné le quiz : '+ currentQuiz.quiz_id} /></center>
                        
                        { displayStudentList && <div >
                            <h4>{'Liste des étudiants : '}</h4>
                            {currentQuiz.quiz_answers && currentQuiz.quiz_answers.map((students, index) => (
                                <div>
                                    <h4 onClick={() => setActiveStudent(students)}>{students.student_id}</h4>
                                </div>
                            ))}
                        </div>}

                        <div>
                            {currentStudent && (
                                <div>
                                    <h4>{'Affichage des réponses sur  : '}{currentStudent.student_id}</h4>
                                    {currentStudent && currentStudent.student_answers.map((answers, index) => (
                                        <div> 
                                            <h4>{answers.question_answer_id}{' .'}{answers.answer}</h4>
                                            <h4>{'Explication : '}{answers.explanation}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={{marginBottom: "20px"}}>

                            {/* <button className="btnn" onClick={stats}>Cliquez pour les statistiques</button> */}
                        </div>
                        <Container>
                            {array && displayStats && (
                                <div>
                                    <Grid container spacing={3}>
                                        {array && array.map((answer, index) => (
                                            <Grid item sm={12} md={6} lg={4} >
                                                <Card elevation={2}>
                                                    <CardHeader
                                                        action={
                                                            <IconButton onClick={handlePieChartChange}>
                                                                <SwapHorizRounded/>
                                                            </IconButton>
                                                        }
                                                        title={""}
                                                        subheader={actualQuiz ? (`Q${index + 1}. `+actualQuiz.questions[index].question_title) : (`Question ${index + 1}`)} 
                                                    />
                                                    <CardContent>
                                                        <DoughnutChart
                                                        pieData={pieData}
                                                        labels={getLabels(answer)}
                                                        answerValues={getAnswerValues(answer, getLabels(answer))} />
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
                                                <Grid item sm={12} md={6} lg={6}>
                                                    <Card elevation={2}>
                                                        <CardHeader
                                                        action={
                                                            <IconButton onClick={handleBarChartChange}>
                                                                <SwapHorizRounded/>
                                                            </IconButton>
                                                        } 
                                                        title={""}
                                                        subheader={actualQuiz ? (`Q${index + 1}. `+actualQuiz.questions[index].question_title) : (`Question ${index + 1}`)}
                                                        />
                                                        <CardContent>
                                                            <BarChart
                                                                barData={barData} 
                                                                explanationArray={allExplanations[index]}
                                                                explanationLabels={getLabels(explanation)}
                                                                explanationValues={getExplanationValues(explanation, getLabels(explanation))} 
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                </div>         
                                )}
                        </Container>    
                    </div>
                ) : (<Title data="Veuillez sélectionner un quiz pour afficher les réponses" noUnderline={true} subHeader={true} />)}
            </div>   
        </div>
    )
}

export default AllAnswers;