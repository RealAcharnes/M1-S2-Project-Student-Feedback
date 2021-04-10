import {useState, useEffect} from 'react';
import Axios from 'axios';
import {FaTimes} from 'react-icons/fa'
import AuthService from "../services/auth.service";
import { List, ListItem, ListItemText } from '@material-ui/core';


const AllQuestions = () => {
    const [allQuizzes, setallQuizzes] = useState([]);
    const [currentQuiz, setcurrentQuiz] = useState(null);
    const [radioOptions, setradioOptions] = useState({});
    const [checkedItems, setCheckedItems] = useState([]); 
    const [currentUser] = useState(AuthService.getCurrentUser());
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
        
    };

    // RETURN CHECKED VALUE(true or false)
    const checkRadioButton = (question_id, label) => {
        if (!radioOptions[question_id]) {
            return false;
        }
        return radioOptions[question_id] === label;
    }

    // SET RADIO BUTTON SELECTION FRO EACH QUESTION
    const setradio = (id , value) => {
        setradioOptions((state) => {
            console.log(state);
            return {
                ...state,
                [id] : value
            }
        });
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
        else{
            setCheckedItems([
                ...checkedItems,
                 {
                    question_answer_id : question_id,
                    answer: radioOptions[question_id],
                    explanation: value 
                }
            ]);
        }
        
    }

    // SUBMIT ANSWERS TO THE BACKEND
    const submitAnswers = () =>{
        const answers = {
            quiz_id : currentQuiz.quiz_id,
            quiz_answers : {
                student_id : currentUser.message.firstname+' '+currentUser.message.lastname,
                student_answers : checkedItems
            }
        }
        console.log("Radio Answer: ", radioOptions);
        console.log("CheckedItems: ", checkedItems);
        console.log("Final: ", answers);
        Axios.post('https://neuroeducation-feedback.herokuapp.com/api/history', {
            answers
          }).then((res) => {
                console.log(res);
                if(res){
                    //   window.location.reload(false);
                    setCheckedItems([]);
                    setradioOptions({});
                }
          }).catch(err => {
                console.log(err);            
          });


    }



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
        <div className="container-questions">
            <h4>Quiz List</h4>
            {/* html for spinner */}
            {showSpinner && <div class="spinner">
                <div></div>
                <div></div>
            </div>
            }
            <div className={`quiz`} style={{borderRadius: "10px", marginTop: "10px"}}>
                <List>
                    {allQuizzes && allQuizzes.map((quiz, index) => (
                        <ListItem button onClick= {() => setActiveQuiz(quiz, index)} >
                            <ListItemText primary={
                                <h4> 
                                    {quiz.quiz} {''} 
                                    <FaTimes 
                                        style={{color: 'red', cursor: 'pointer'}}
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
                        <center><h4>{currentQuiz.quiz}</h4><br/></center>
                        {currentQuiz.questions && currentQuiz.questions.map((questions, indexx) => (
                            <div key={questions.question_id}>
                                <h4>{questions.question_id}{'. '}{questions.question_title}</h4>    
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
                                ) : (<span>No Explanation Needed</span>)}
                            </div>
                        ))}
                    </div>
                ) : (<h4>Please click on a quiz</h4>)}
            </div>
            <button className='btn' onClick={submitAnswers}>Submit Answers</button>

        </div>
    )
}

export default AllQuestions
