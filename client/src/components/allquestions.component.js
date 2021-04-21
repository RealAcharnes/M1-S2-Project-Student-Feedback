import {useState, useEffect} from 'react';
import Axios from 'axios';
// import {FaTimes} from 'react-icons/fa'
import { List, ListItem, ListItemText, Button, ListItemIcon } from '@material-ui/core';
import BookOutlined from '@material-ui/icons/BookOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NoteCard from "./NoteCard";



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
          console.log(response.data);
          setallQuizzes(response.data) 
          setShowSpinner(false);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []);

    // SET SELECTED(CLICKED) QUIZ
    const setActiveQuiz = (quiz, index) => {
        console.log(quiz)
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
        console.log(find_question)
        if(find_question) {
            checkedArray.find(a => a.question_answer_id === id).answer = answer;
            setradioOptions((state) => {
                console.log(state);
                return {
                    ...state,
                    [id] : answer
                }
            });
            setCheckedItems(checkedArray);
        }
        else{
        setradioOptions((state) => {
            console.log(state);
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
        console.log(find_question)
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
    //     console.log("current: ", currentQuiz);

    //     console.log("Radio Answer: ", radioOptions);
    //     console.log("CheckedItems: ", checkedItems);
    //     console.log("Final: ", answers);
    //     Axios.post('https://neuroeducation-feedback.herokuapp.com/api/history', {
    //         answers
    //       }).then((res) => {
    //             console.log(res);
    //             if(res){
    //                 //   window.location.reload(false);
    //                 setmessage('You submitted Quiz as Admin or Teacher... Please Delete from the answers page else Stats will be affected');
    //                 setsuccessful(true);
    //                 setCheckedItems([]);
    //                 setradioOptions({});

    //             }
    //       }).catch(error => {
    //             console.log(error);
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



    //DELETE SLECTED QUIZ WITH THE QUIZ ID FROM DAATABASE
    // const onDelete = (id) => {
    //     Axios.delete(`https://neuroeducation-feedback.herokuapp.com/api/delete/${id}`)
    //     .then((res) => {
    //         console.log(res)
    //         setallQuizzes(allQuizzes.filter((question) => question._id !== id))
    //     })
    //     .catch(err => {
    //         console.log(err); 
    //     });
    // }; 


    return (
        <div >
            {/* html for spinner */}
            {showSpinner && <div class="spinner">
                <div></div>
                <div></div>
            </div>
            }
            {!showSpinner && displayQuizzes && (<div  style={{borderRadius: "10px", marginTop: "10px"}}>
                <List>
                    {/* <h4></h4> */}
                    <div >      
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <h4 style={{padding: "20px", "margin-bottom": "10px"}}> <span>Liste de quiz</span> </h4>
                        <div className="row" >
                            {displayQuizzes && allQuizzes && allQuizzes.map((quiz, index) => (
                                <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-4" onClick= {() => setActiveQuiz(quiz, index)}> 
                                    <NoteCard note={quiz.quiz_id}  handleDelete={"no delete"} color={'#4257b2'}/>
                                </div> 
                            ))}
                        </div>
                      </div>
                    </div>
                    {/* { displayQuizzes && allQuizzes && allQuizzes.map((quiz, index) => (
                        <ListItem button onClick= {() => setActiveQuiz(quiz, index)} >
                            <ListItemIcon>
                                <BookOutlined />
                            </ListItemIcon>
                            <ListItemText primary={
                                <h4> 
                                    {quiz.quiz} {''} 
                                </h4>
                            } />
                        </ListItem>
                    ))} */}
                </List>
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
            {/* <Button disableElevation variant="contained" onClick={submitAnswers}>Soumettre les réponses</Button> */}

        </div>
    )
}

export default AllQuestions
