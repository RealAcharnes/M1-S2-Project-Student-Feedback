import {useState, useEffect} from 'react';
import Axios from 'axios';
// import {FaTimes} from 'react-icons/fa'
import { Button} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, Typography } from '@material-ui/core';

import FlippyItems from './Flippy';


import {Title} from './Title';


const AllQuestions = () => {
    const [allQuizzes, setallQuizzes] = useState([]);
    const [currentQuiz, setcurrentQuiz] = useState(null);
    const [radioOptions, setradioOptions] = useState({});
    const [checkedItems, setCheckedItems] = useState([]); 
    const [displayQuiz, setdisplayQuiz] = useState(false);
    const [displayQuizzes, setdisplayQuizzes] = useState(true)

    // const [currentUser] = useState(AuthService.getCurrentUser());
    const [showSpinner, setShowSpinner] = useState(true);

    // LOAD ALL QUIZZES FROM DATABASE ON PAGE REFRESH AND SET RESPONSE INTO AN ARRAY
    useEffect(() => {
        Axios.get('https://neuroeducation-feedback.herokuapp.com/api/findAllQ').then((response) => {
          setallQuizzes(response.data) 
          setShowSpinner(false);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []);

    // SET SELECTED(CLICKED) QUIZ
    const setActiveQuiz = (quiz, index) => {
        setcurrentQuiz(quiz);
        setdisplayQuizzes(false);
        setdisplayQuiz(true);
    };

    const backToQuizzes = () => {
        setdisplayQuizzes(true);
        setdisplayQuiz(false);
    }

    // RETURN CHECKED VALUE(true or false)
    const checkRadioButton = (question_id, label) => {
        if (!radioOptions[question_id]) {
            return false;
        }
        return radioOptions[question_id] === label;
    }

    // SET RADIO BUTTON SELECTION FRO EACH QUESTION
    const setradio = (id , answer) => {
        let checkedArray = checkedItems.map(x => {return {...x}})
        const find_question = checkedArray.find(a => a.question_answer_id === id);
        if(find_question) {
            checkedArray.find(a => a.question_answer_id === id).answer = answer;
            setradioOptions((state) => {
                return {
                    ...state,
                    [id] : answer
                }
            });
            setCheckedItems(checkedArray);
        }
        else{
        setradioOptions((state) => {
            return {
                ...state,
                [id] : answer
            }
        });

        setCheckedItems([
            ...checkedItems,
             {
                question_answer_id : id,
                answer: answer,
                explanation: 'no explanation'
            }
        ]);}
    }

    // SET EXPLANATION TOGETHER WITH ANSWERS AND QUESTION NUMBER
    const setCheckbox = (value, checked, question_id, question_title, quiz_id) => {
        let checkedArray = checkedItems.map(x => {return {...x}})
        const find_question = checkedArray.find(a => a.question_answer_id === question_id);
        if(find_question) {
            checkedArray.find(a => a.question_answer_id === question_id).explanation = value;
            setCheckedItems(checkedArray);
        }
        
    }

    // SUBMIT ANSWERS TO THE BACKEND  // DISABLED BECAUSE ADMIN MUST NOT SUBMIT
    // const submitAnswers = () =>{
    //     setmessage('');
    //     setsuccessful(false);
    //     const answers = {
    //         quiz_id : currentQuiz.quiz_id,
    //         quiz_title : currentQuiz.quiz,
    //         quiz_answers : {
    //             student_id : currentUser.message.email,
    //             student_answers : checkedItems
    //         }
    //     }
    //     Axios.post('https://neuroeducation-feedback.herokuapp.com/api/history', {
    //         answers
    //       }).then((res) => {
    //             if(res){
    //                 //   window.location.reload(false);
    //                 setmessage('You submitted Quiz as Admin or Teacher... Please Delete from the answers page else Stats will be affected');
    //                 setsuccessful(true);
    //                 setCheckedItems([]);
    //                 setradioOptions({});

    //             }
    //       }).catch(error => {
    //             const errMessage =
    //             (error.response.data.message[0].password || (error.response &&
    //               error.response.data &&
    //               error.response.data.message)) ||
    //             error.message ||
    //             error.toString();
    //             console.log(errMessage);
    //           setmessage(errMessage);
    //             setsuccessful(false);            
    //       });


    // }


    return (
        <div >
            {/* html for spinner */}
            {showSpinner && <div class="spinner">
                <div></div>
                <div></div>
            </div>
            }
            {!showSpinner && displayQuizzes && (<div  style={{borderRadius: "10px", marginTop: "10px"}}>
                    <div >      
                      <div className="col-xs-12 col-sm-12 col-md-12">
                          <Title data='Liste de quiz' />
                        <div className="row" >
                            {displayQuizzes && allQuizzes && allQuizzes.map((quiz, index) => (
                                <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-4" onClick= {() => setActiveQuiz(quiz, index)} style={{paddingTop: "10px"}}> 
                                    <FlippyItems
                                    frontSide={
                                        <Card 
                                        elevation={1} 
                                        style={{ padding: "20px", "margin-bottom": "10px"}}  >
                                            <CardHeader
                                                  avatar={
                                                      (<Avatar  style={{backgroundColor: "#4257b2"}}>
                                                          {quiz.quiz_id[0].toUpperCase()}
                                                      </Avatar>)
                                              }
        
                                                  title={quiz.quiz_id}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    {(quiz.quiz).substr(0,27) + "..."}
                                                </Typography>
                                            </CardContent>
                                        </Card> 
                                    }
                                    backSide={
                                        <Card 
                                        elevation={1} 
                                        style={{ padding: "20px", "margin-bottom": "10px"}}  >
                                            <CardHeader
                                                  avatar={
                                                      (<Avatar  style={{backgroundColor: "#4257b2"}}>
                                                          {quiz.quiz_id[0].toUpperCase()}
                                                      </Avatar>)
                                              }
        
                                                  title={quiz.quiz_id}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    {(quiz.quiz).substr(0,27) + "..."}
                                                </Typography>
                                            </CardContent>
                                        </Card> 
                                    }
                                    />

                                </div> 
                            ))}
                        </div>
                      </div>
                    </div>

            </div>)}

            <div>
                {(displayQuiz && currentQuiz ) && (
                    <div className="container-questions">
                        <Button onClick={()=> backToQuizzes()}><ArrowBackIcon fontsize="large" style={{color: "#4257b2"}}/></Button> 
                        <center><h4>{currentQuiz.quiz}</h4><br/></center>
                        {currentQuiz.questions && currentQuiz.questions.map((questions, indexx) => (
                            <div key={questions.question_id}>
                                <p><strong>{questions.question_id}{'. '}{questions.question_title}</strong></p>    
                                <div>
                                    <input 
                                        type="radio" 
                                        value="Oui" 
                                        checked={checkRadioButton(questions.question_id, "Oui")}  
                                        onChange={(e) => setradio(questions.question_id, e.target.value)} 
                                    /> Oui
                                    <input 
                                        type="radio" 
                                        value="Plutot Oui"  
                                        checked={checkRadioButton(questions.question_id, "Plutot Oui")}  
                                        onChange={(e) => setradio(questions.question_id, e.target.value)} 
                                    /> Plutot Oui
                                    <input 
                                        type="radio" 
                                        value="Plutot Non"  
                                        checked={checkRadioButton(questions.question_id, "Plutot Non")}  
                                        onChange={(e) => setradio(questions.question_id, e.target.value)}
                                    /> Plutot Non
                                    <input 
                                        type="radio" 
                                        value="Non" 
                                        checked={checkRadioButton(questions.question_id, "Non")}  
                                        onChange={(e) => setradio(questions.question_id, e.target.value)}
                                    /> Non
                                </div>
                                {radioOptions[questions.question_id] === "Plutot Non"
                                || radioOptions[questions.question_id] === "Plutot Oui"
                                || radioOptions[questions.question_id] === "Non" ? (
                                    <div>
                                        {questions.question_options && questions.question_options.map((options, index) => ( 
                                            <div>
                                                <label>
                                                    <input type="checkbox" value={options.options_id} 
                                                    checked={checkedItems[options.option_text]}  
                                                    onChange={(e) => 
                                                        setCheckbox(e.target.value, e.target.checked, questions.question_id, questions.question_id,currentQuiz.quiz_id)
                                                    }
                                                    />
                                                    <span>{'  '}{options.options_id}{'. '}{options.options_text}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (<span>Aucune explication requise</span>)}
                            </div>
                        ))}
                    </div>
                ) }
            </div>

        </div>
    )
}

export default AllQuestions
