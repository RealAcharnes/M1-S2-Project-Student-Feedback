import React from 'react';
import SearchService from '../services/search.service';
import AuthService from '../services/auth.service';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, Typography } from '@material-ui/core';
import { Title } from './Title';
import LineLabels from './LineLabels';
import LineChart from './LineChart';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FlippyItems from './Flippy';
import Tooltip from '@material-ui/core/Tooltip';
import EqualizerIcon from '@material-ui/icons/Equalizer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BoardUser = () => {
  const [search, setsearch] = useState('');
  const [successful, setsuccessful] = useState(false);
  const [message, setmessage] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  // const [errors, seterrors] = useState([])
  const [currentQuiz, setcurrentQuiz] = useState(null);
  const [radioOptions, setradioOptions] = useState({});
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentUser] = useState(AuthService.getCurrentUser());
  const [allQuizzes, setallQuizzes] = useState([]);
  const [displayAllAnswered, setdisplayAllAnswered] = useState(false);
  const [validate, setvalidate] = useState(false);
  const [validateMessage, setvalidateMessage] = useState('')
  const [lineArray, setLineArray] = useState([]);
  const [actualQuiz, setactualQuiz] = useState([]);
  const [displayMain, setdisplayMain] = useState(true);
  const [displayLineChart, setDisplayLineChart] = useState(false);
  const [displayCurrentQuiz, setdisplayCurrentQuiz] = useState(false);
  const [value, setValue] = useState(); //just for refreshing the component for changes to take effect

  const evolution = () => {
    setdisplayMain(false);
    setDisplayLineChart(true);
    setdisplayCurrentQuiz(false);
  };
  const goBack = () => {
    setdisplayMain(true);
    setdisplayAllAnswered(true);
    setDisplayLineChart(false);
    setdisplayCurrentQuiz(false);
  };

  // CREATE ARRAY CONTAINING ANSWERS OF EACH ATTEMPT
  const getAllAns = (quiz) => {
    let array = [];
    quiz.student_answers.forEach((answers) => {
      switch (answers.answer) {
        case 'Non':
          array.push(1);
          break;
        case 'Plutot Non':
          array.push(2);
          break;
        case 'Plutot Oui':
          array.push(3);
          break;
        default:
          array.push(4);
          break;
      }
    });
    return array;
  };

  //GENERATE DATA VALUES FOR LINE CHART
  const getLineData = (groupArray, index) => {
    let dataArray = [];
    groupArray.forEach((item) => {
      dataArray.push(item[index]);
    });
    return dataArray;
  };
  //
  const setActiveQuizRefreshComponentToEffectChanges = (quiz, index) => {
    setActiveQuiz(quiz, index);
    // by calling this method react re-renders the component
    setValue({});
  };

  //SET ACTIVE QUIZ
  const setActiveQuiz = (quiz, index) => {
    let tempLineArray = [];
    quiz.quiz_answers.forEach((quiz, index) => {
      tempLineArray.push(getAllAns(quiz));
    });
    setLineArray(tempLineArray);

    // setdisplayQuizzes(null);

    // GET ACTUAL QUESTIONS FROM DATABASE
    SearchService.searchQuiz(quiz.quiz_id)
      .then((response) => {
        setactualQuiz(response.data);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      });
  };

  // LOAD ALL QUIZZES ANSWERED BY CURRENT STUDENT FROM DATABASE
  //ON PAGE REFRESH AND SET RESPONSE INTO AN ARRAY
  useEffect(() => {
    const student_id = currentUser.message.email;
    axios
      .get(
        `https://neuroeducation-feedback.herokuapp.com/api/studentQuizzes/${student_id}`
      )
      .then((response) => {
        setallQuizzes(response.data.quizzes);
      })
      .catch(function (err) {
        seterrorMessage(err.response);
      });
  }, [currentUser, allQuizzes]);

  const onChangeSearch = (e) => {
    setsearch(e.target.value);
  };

  // RETURN CHECKED VALUE(true or false)
  const checkRadioButton = (question_id, label) => {
    if (!radioOptions[question_id]) {
      return false;
    }
    return radioOptions[question_id] === label;
  };

  // SET RADIO BUTTON SELECTION FRO EACH QUESTION
  const setradio = (id, answer) => {
    let checkedArray = checkedItems.map((x) => {
      return { ...x };
    });
    const find_question = checkedArray.find((a) => a.question_answer_id === id);
    if (find_question) {
      checkedArray.find((a) => a.question_answer_id === id).answer = answer;
      setradioOptions((state) => {
        return {
          ...state,
          [id]: answer,
        };
      });
      setCheckedItems(checkedArray);
    } else {
      setradioOptions((state) => {
        return {
          ...state,
          [id]: answer,
        };
      });

      setCheckedItems([
        ...checkedItems,
        {
          question_answer_id: id,
          answer: answer,
          explanation: 'no explanation',
        },
      ]);
    }
  };

  // SET EXPLANATION TOGETHER WITH ANSWERS AND QUESTION NUMBER
  const setCheckbox = (
    value,
    checked,
    question_id,
    question_title,
    quiz_id
  ) => {
    let checkedArray = checkedItems.map((x) => {
      return { ...x };
    });
    const find_question = checkedArray.find(
      (a) => a.question_answer_id === question_id
    );
    if (find_question) {
      checkedArray.find(
        (a) => a.question_answer_id === question_id
      ).explanation = value;
      setCheckedItems(checkedArray);
    }
  };

  // SUBMIT ANSWERS TO THE BACKEND
  const submitAnswers = () => {
    const timestamp = Date.now();
    const formatedTimestamp = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(timestamp);
    const answers = {
      quiz_id: currentQuiz.quiz_id,
      quiz_title: currentQuiz.quiz,
      quiz_answers: {
        student_id: currentUser.message.email,
        student_answers: checkedItems,
        time_submitted: formatedTimestamp,
      },
    };

    if (
      currentQuiz.questions.length !==
      answers.quiz_answers.student_answers.length
    ) {
      setvalidateMessage("Veuillez répondre à toutes les questions");
      setvalidate(true);
      return setvalidate(true);
    }
    if (
      currentUser.message.roles.includes("ROLE_ADMIN")
    ) {
      
      setvalidateMessage("Les administrateurs ne peuvent pas participer au quiz, ils ne peuvent qu'avoir un aperçu de la page des élèves.");
      setvalidate(true);
      return setvalidate(true);
    }

    axios
      .post('https://neuroeducation-feedback.herokuapp.com/api//history', {
        answers,
      })
      .then((res) => {
        if (res) {
          //   window.location.reload(false);
          setcurrentQuiz(null);
          setCheckedItems([]);
          setradioOptions({});
          setallQuizzes([...allQuizzes, answers]);
          setmessage('Réponses soumises');
          setsuccessful(true);
          setdisplayAllAnswered(true);
        }
      })
      .catch((err) => {
        setcurrentQuiz(null);
        setsuccessful(false);
        setmessage(
          err.response.data.message || err.response.data.message[0].error
        );
      });
  };

  const handleClose = () => {
    setvalidate(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setmessage('');
    setsuccessful(false);

    // this.form.validateAll();

    SearchService.searchQuiz(search)
      .then((response) => {
        setdisplayAllAnswered(false);
        setsuccessful(true);
        setcurrentQuiz(response.data);
        setdisplayCurrentQuiz(true);
      })
      .catch((error) => {
        console.log(error.response);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setmessage(resMessage);
        setsuccessful(false);
      });
  };

  return (
    <div>
      {displayMain && (
        <div>
          <div>
            {errorMessage && (
              <div className="form-group">
                <div className={'alert alert-danger'} role="alert">
                  {errorMessage}
                </div>
              </div>
            )}

            {(!successful || displayAllAnswered) && (
              <div>
                <div style={{ marginTop: '50px' }}>
                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful
                            ? 'alert alert-success'
                            : 'alert alert-danger'
                        }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                  <form id="form">
                    <input
                      onChange={onChangeSearch}
                      id="commonSearchTerm"
                      className="input-field"
                      placeholder="Entrez un code de quiz valide..."
                      required
                    />
                    <button
                      id="searchButton"
                      className="input-field"
                      onClick={handleSearch}
                    >
                      Rechercher
                    </button>
                  </form>
                </div>

                {(displayAllAnswered || !successful) && allQuizzes && (
                  <div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <center>
                        <Title data={'Quiz déjà répondus'} />
                      </center>
                      <div className="row">
                        {allQuizzes &&
                          allQuizzes.map((quiz, index) => (
                            <div
                              key={index}
                              className="col-xs-12 col-sm-12 col-md-6 col-lg-4"
                            >
                              {/* <Card className="card" elevation={1} style={{ padding: "20px", "margin-bottom": "10px"}} onMouseOver={() => setActiveQuiz(quiz, index)} onClick={evolution} >
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
                                              {quiz.quiz_id}
                                          </Typography>
                                      </CardContent>
                                    </Card> */}

                              <FlippyItems
                                frontSide={
                                  <div key={index}>
                                    <Card
                                      elevation={1}
                                      style={{
                                        padding: '20px',
                                        marginBottom: '10px',
                                      }}
                                      onMouseOver={() =>
                                        setActiveQuizRefreshComponentToEffectChanges(
                                          quiz,
                                          index
                                        )
                                      }
                                    >
                                      <CardHeader
                                        avatar={
                                          <Avatar
                                            style={{
                                              backgroundColor: '#4257b2',
                                            }}
                                          >
                                            {quiz.quiz_id[0].toUpperCase()}
                                          </Avatar>
                                        }
                                        title={quiz.quiz_id}
                                        // subheader={note}
                                      />
                                      <CardContent>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          {quiz.quiz_id}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </div>
                                }
                                backSide={
                                  <div key={index}>
                                    <Card
                                      elevation={1}
                                      style={{
                                        padding: '20px',
                                        marginBottom: '10px',
                                      }}
                                    >
                                      <CardHeader
                                        avatar={
                                          <Avatar
                                            style={{
                                              backgroundColor: '#4257b2',
                                            }}
                                          >
                                            {quiz.quiz_id[0].toUpperCase()}
                                          </Avatar>
                                        }
                                        title={quiz.quiz_id}
                                      />
                                      <CardContent>
                                        <div
                                          style={{
                                            float: 'right',
                                            color: '#4257b2',
                                          }}
                                        >
                                          <Tooltip title="Cliquez pour les statistiques">
                                            <IconButton
                                              onClick={evolution}
                                              style={{
                                                float: 'right',
                                                color: '#4257b2',
                                              }}
                                            >
                                              <EqualizerIcon />
                                            </IconButton>
                                          </Tooltip>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                }
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        {displayCurrentQuiz && currentQuiz && (
          <div className="container-questions">
            <IconButton
              onClick={() => goBack()}
              style={{ float: 'left', color: '#4257b2' }}
            >
              <ArrowBackIcon />
            </IconButton>
            {validate && (
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={validate}
                autoHideDuration={6000}
                onClose={() => handleClose()}
              >
                <Alert onClose={() => handleClose()} severity="error">
                  {validateMessage}
                </Alert>
              </Snackbar>
            )}
            <center>
              <h4>{currentQuiz.quiz}</h4>
              <br />
            </center>
            {currentQuiz.questions &&
              currentQuiz.questions.map((questions, indexx) => (
                <div key={questions.question_id}>
                  <span style={{ fontSize: '20px' }}>
                    {questions.question_id}
                    {'. '}
                    {questions.question_title}
                  </span>
                  <div>
                    <input
                      className="input"
                      type="radio"
                      value="Oui"
                      checked={checkRadioButton(questions.question_id, 'Oui')}
                      onChange={(e) =>
                        setradio(questions.question_id, e.target.value)
                      }
                    />{' '}
                    Oui
                    <input
                      className="input"
                      type="radio"
                      value="Plutot Oui"
                      checked={checkRadioButton(
                        questions.question_id,
                        'Plutot Oui'
                      )}
                      onChange={(e) =>
                        setradio(questions.question_id, e.target.value)
                      }
                    />{' '}
                    Plutot Oui
                    <input
                      className="input"
                      type="radio"
                      value="Plutot Non"
                      checked={checkRadioButton(
                        questions.question_id,
                        'Plutot Non'
                      )}
                      onChange={(e) =>
                        setradio(questions.question_id, e.target.value)
                      }
                    />{' '}
                    Plutot Non
                    <input
                      className="input"
                      type="radio"
                      value="Non"
                      checked={checkRadioButton(questions.question_id, 'Non')}
                      onChange={(e) =>
                        setradio(questions.question_id, e.target.value)
                      }
                    />{' '}
                    Non
                  </div>

                  {radioOptions[questions.question_id] === 'Plutot Non' ||
                  radioOptions[questions.question_id] === 'Plutot Oui' ||
                  radioOptions[questions.question_id] === 'Non' ? (
                    <div>
                      {questions.question_options &&
                        questions.question_options.map((options, index) => (
                          <div>
                            <label>
                              <input
                                type="checkbox"
                                value={options.options_id}
                                checked={checkedItems[options.option_text]}
                                onChange={(e) =>
                                  setCheckbox(
                                    e.target.value,
                                    e.target.checked,
                                    questions.question_id,
                                    questions.question_id,
                                    currentQuiz.quiz_id
                                  )
                                }
                              />
                              <span>
                                {'  '}
                                {options.options_id}
                                {'. '}
                                {options.options_text}
                              </span>
                            </label>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <span>No Explanation Needed</span>
                  )}
                </div>
              ))}
            <div className="form-group">
              <button className="btnn" onClick={submitAnswers}>
                Soumettre les réponses
              </button>
            </div>
          </div>
        )}
      </div>
      {displayLineChart && (
        <div>
          <IconButton
            onClick={() => goBack()}
            style={{ float: 'left', color: '#4257b2' }}
          >
            <ArrowBackIcon />
          </IconButton>
          {lineArray.length ? (
            <Grid container spacing={3}>
              {lineArray.length &&
                displayLineChart &&
                lineArray[0].map((attempt, index) => (
                  <Grid item md={6} sm={12} lg={4}>
                    <Card elevation={2}>
                      <CardHeader
                        title={
                          <Typography
                            style={{ fontSize: '1rem' }}
                            color="textSecondary"
                            variant="h6"
                            component="p"
                          >
                            {actualQuiz
                              ? `Q${index + 1}. ` +
                                actualQuiz.questions[index].question_title
                              : `Question ${index + 1}`}
                          </Typography>
                        }
                        subheader={
                          <div style={{ fontSize: '0.8rem' }}>
                            Oui-4 Plutot Oui-3 Plutot Non-2 Non-1
                          </div>
                        }
                      />
                      <CardContent>
                        <LineChart
                          labels={LineLabels(lineArray.length)}
                          data={getLineData(lineArray, index)}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Title
              data="Aucune donnée pour le graphique, veuillez d'abord répondre au quiz."
              noUnderline={true}
              subHeader={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BoardUser;
