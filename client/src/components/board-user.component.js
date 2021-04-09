import React from "react";
import SearchService from "../services/search.service";
import AuthService from "../services/auth.service";
import {useState, useEffect} from 'react';
import axios from "axios";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Ce champ est obligatoire !
            </div>
        );
    }
};

const vsearch = value => {
  if (value.length < 6) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit contenir entre 6 charactères.
      </div>
    );
  }
};

const BoardUser = () => {
  const [search, setsearch] = useState('');
  const [successful, setsuccessful] = useState(false);
  const [message, setmessage] = useState('');
  const [currentQuiz, setcurrentQuiz] = useState(null);
  const [radioOptions, setradioOptions] = useState({})
  const [checkedItems, setCheckedItems] = useState([]); 
  const [currentUser] = useState(AuthService.getCurrentUser()) ;
  const [allQuizzes, setallQuizzes] = useState([]);
  const [displayAllAnswered, setdisplayAllAnswered] = useState(false);


  // LOAD ALL QUIZZES ANSWERED BY CURRENT STUDENT FROM DATABASE 
  //ON PAGE REFRESH AND SET RESPONSE INTO AN ARRAY
  useEffect(() => {
    const student_id = currentUser.message.email;
    axios.get(`https://neuroeducation-feedback.herokuapp.com/api/studentQuizzes/${student_id}`).then((response) => {
      console.log(response.data);
      setallQuizzes(response.data) 
    })
    .catch(function (error) {
        console.log(error);
    });
  }, [currentUser]);

  // SET SELECTED(CLICKED) QUIZ
  const setActiveQuiz = (quiz, index) => {
    console.log(quiz)
    // setcurrentQuiz(quiz);
    // setcurrentIndex(index)
  };

  const onChangeSearch = (e) =>{
    setsearch(e.target.value)
  }

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
    setmessage("");
    setsuccessful(false);
    setdisplayAllAnswered(false);
    const answers = {
        quiz_id : currentQuiz.quiz_id,
        quiz_answers : {
            student_id : currentUser.message.email,
            student_answers : checkedItems
        }
    }
    console.log("Radio Answer: ", radioOptions);
    console.log("CheckedItems: ", checkedItems);
    console.log("Final: ", answers);
    axios.post('https://neuroeducation-feedback.herokuapp.com/api/history', {
        answers
      }).then((res) => {
          console.log(res);
          if(res){
              //   window.location.reload(false);
              setcurrentQuiz(null);
              setCheckedItems([]);
              setradioOptions({});
              setallQuizzes([...allQuizzes, answers])
              setmessage('Answers Submitted');
              setsuccessful(true);
              setdisplayAllAnswered(true);
              
          }
      }).catch(err => {
          setcurrentQuiz(null)  
          setsuccessful(false);
          console.log(err.response.data.message|| err.response.data.message[0].error);   
          setmessage(err.response.data.message|| err.response.data.message[0].error);
                 
      });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setmessage("");
    setsuccessful(false);
    setdisplayAllAnswered(false);

    // this.form.validateAll();

    SearchService.searchQuiz(
      search,
    ).then(
      response => {
        console.log(response);
        setsuccessful(true);
        setcurrentQuiz(response.data);
      })
      .catch(
      error => {
        console.log(error.response);
        const resMessage =
          (error.response && error.response.data && error.response.data.message) 
          || error.message || error.toString();

        setmessage(resMessage);
        setsuccessful(false);
      }
    );
    
  }

return (
<div>
  <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-6">
    <div className={!successful || message ? "card card-container" : ""}>
        {(!successful || displayAllAnswered)  && (
          <div >
            <div className="form-group">
              <label htmlFor="search">Search for Quiz</label>
              <input
                type="text"
                className="form-control"
                name="search"
                value={search}
                onChange={onChangeSearch}
                validations={[required, vsearch]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block"  onClick={handleSearch}>Search Quiz</button>
            </div>
          </div>
        )}
        {message && (
          <div className="form-group">
            <div
              className={
                successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
      </div>

      <div className="col-xs-12 col-sm-12 col-md-6">
    <div className={!successful || message ? "card card-container" : ""}>
        {(displayAllAnswered || !successful )  && allQuizzes && (
          <div >
            <h4>Quizzes Already Answered</h4>
            <div className={`quiz`} >
                {allQuizzes && allQuizzes.map((quiz, index) => (
                    <h4 
                    onClick= {() => setActiveQuiz(quiz, index)}
                    > {quiz.quiz_id} 
                    </h4>
                ))}
            </div>
          </div>
        )}

      </div>
      </div>
      </div>


      <div >
      {currentQuiz && (
        <div className="container-questions"> 
          <center><h4>{currentQuiz.quiz}</h4><br/></center>
          {currentQuiz.questions && currentQuiz.questions.map((questions, indexx) => (
            <div key={questions.question_id}>
              <h4>{questions.question_id}{'. '}{questions.question_title}</h4>    
              <div>
                  <input 
                      className="input"
                      type="radio" 
                      value="Oui" 
                      checked={checkRadioButton(questions.question_id, "Oui")}  
                      onChange={(e) => setradio(questions.question_id, e.target.value)} 
                  /> Oui
                  <input 
                      className="input"
                      type="radio" 
                      value="Plutot Oui"  
                      checked={checkRadioButton(questions.question_id, "Plutot Oui")}  
                      onChange={(e) => setradio(questions.question_id, e.target.value)} 
                  /> Plutot Oui
                  <input
                      className="input" 
                      type="radio" 
                      value="Plutot Non"  
                      checked={checkRadioButton(questions.question_id, "Plutot Non")}  
                      onChange={(e) => setradio(questions.question_id, e.target.value)}
                  /> Plutot Non
                  <input
                      className="input" 
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
          <div className="form-group">
            <button className="btnn" onClick={submitAnswers}>Submit Answers</button>
          </div>
        </div>
          )
        }
      </div>

</div>
    );
  }

  export default BoardUser