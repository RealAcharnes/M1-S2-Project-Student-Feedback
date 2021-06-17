import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import { Snackbar, Switch } from '@material-ui/core';
import PostForm from '../services/admin-submit-form';
import AuthService from '../services/auth.service';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SearchService from '../services/search.service';
import ConfirmDialogue from './confirm-dialogue';
import MuiAlert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuOption from './menu';
import EditIcon from '@material-ui/icons/Edit';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import QueueIcon from '@material-ui/icons/Queue';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { Title } from './Title';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire !
      </div>
    );
  }
};

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onClickAddExplanation = this.onClickAddExplanation.bind(this);
    this.state = {
      explanations: false,
      delete: this.props.delete,
    };
  }

  onChangeQuestion(e) {
    this.props.onQuestionChange(e.target.value);
  }

  onChangeExplanation(indexExplanation, e) {
    this.props.onExplanationChange(indexExplanation, e.target.value);
  }

  onClickRemoveExplanation(indexExplanation) {
    this.props.onRemoveExplanationClick(indexExplanation);
  }

  onClickAddExplanation() {
    this.props.onAddExplanationClick();
    this.setState({
      explanations: true,
    });
  }

  createExplanationUI() {
    return (
      <div>
        {this.props.explanations ? (
          this.props.explanations.map((element, indexExplanation) => (
            <div>
              <div key={indexExplanation} className="form-group">
                <label htmlFor="explanation">Explication</label>
                <form id="formExp">
                  <input
                    onChange={this.onChangeExplanation.bind(
                      this,
                      indexExplanation
                    )}
                    id="inputExp"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    style={{ height: '50' }}
                  />
                  <Tooltip title="Supprimer cette explication">
                    <button
                      type="button"
                      id="buttonExp"
                      onClick={this.onClickRemoveExplanation.bind(
                        this,
                        indexExplanation
                      )}
                    >
                      {' '}
                      <DeleteForeverIcon style={{ color: 'red' }} />{' '}
                    </button>
                  </Tooltip>
                </form>
              </div>
            </div>
          ))
        ) : (
          <h3>No Explanation props</h3>
        )}
      </div>
    );
  }

  render() {
    const question = this.state.question;
    const deleteQuiz = this.state.delete;

    return (
      <div>
        <Form>
          <div className="form-group">
            <label htmlFor="question" style={{ paddingTop: '10px' }}>
              <span>
                <strong>Question</strong>
                <Tooltip title="Supprimer cette question">
                  <IconButton
                    className="deleteQuestion"
                    onClick={deleteQuiz}
                    style={{ float: 'right' }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              name="question"
              value={question}
              onChange={this.onChangeQuestion}
              validations={[required]}
              autoComplete="off"
            />
          </div>
          {this.state.explanations && this.createExplanationUI()}

          <Tooltip title="Adjouter une explication">
            <IconButton
              onClick={this.onClickAddExplanation}
              style={{ color: '#4257b2', float: 'left', marginBottom: '15px' }}
            >
              <QueueIcon />
            </IconButton>
          </Tooltip>
          <br />
          <br />
        </Form>
      </div>
    );
  }
}

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.onClickAddQuestion = this.onClickAddQuestion.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.allowQuiz = this.allowQuiz.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.getQuiz = this.getQuiz.bind(this);
    this.test = this.test.bind(this);

    this.state = {
      title: '',
      created_by: '',
      questions: [
        {
          question_id: '',
          question_title: '',
          question_options: [],
        },
      ],
      message: '',
      currentUser: undefined,
      submitted: false,
      quizMdp: '',
      allQuizzes: null,
      displayQuizzes: null,
      errorMessage: '',
      laststate: null,
      confirmDialog: {
        isOpen: false,
        title: '',
        subTitle: '',
      },
      updateTitle: 'Are you sure you want to update?',
      updateSubTitle: 'You will be able to edit again',
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    axios
      .get(
        `https://neuroeducation-feedback.herokuapp.com/api/studentQuizzes/${user.message.email}`
      )
      .then((response) => {
        if (response.data.quizzes.length) {
          this.setState({
            allQuizzes: response.data.quizzes,
            displayQuizzes: true,
          });
        } else {
          this.setState({
            allQuizzes: null,
            displayQuizzes: false,
          });
        }
      })
      .catch(function (err) {
        this.setState({
          errorMessage:
            err.response.data.message || err.response.data.message[0].error,
        });
      });

    this.setState({
      menuOptions: [
        {
          title: 'Retourner',
          icon: <ArrowBackIcon fontSize="large" />,
          onclick: this.backToQuizzes,
        },
        {
          title: 'Éditer',
          icon: <EditIcon fontSize="large" />,
          onclick: this.editQuiz,
        },
        {
          title: 'Effacer',
          icon: <DeleteForeverIcon fontSize="large" />,
          onclick: () =>
            this.setConfirmDialog(
              'delete',
              'Are you sure you want to Delete this Quiz?',
              'Question will be deleted permanently but no with Students Records',
              this.deleteQuiz
            ),
        },
      ],
    });
  }

  createQuiz = () => {
    this.setState({
      laststate: this.state.displayQuizzes,
      displayQuizzes: null,
      displayCreate: true,
      displayQuiz: false,
    });
  };

  backToQuizzes = () => {
    this.setState({
      displayQuizzes: this.state.laststate,
      displayCreate: false,
      displayQuiz: false,
      edit: false,
    });
  };

  test(e) {
    alert('test');
  }

  getQuiz = (quiz_idd) => {
    SearchService.searchQuiz(quiz_idd)
      .then((response) => {
        this.setState({
          displayQuiz: true,
          laststate: this.state.displayQuizzes,
          currentQuiz: response.data,
          currentQuizQuestions: response.data.questions,
          toggle: response.data.allow,
          displayQuizzes: null,
          displayCreate: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          message: resMessage,
          successful: false,
        });
      });
  };

  setConfirmDialog = (type, title, subtitle, onconfirm) => {
    this.setState({
      confirmDialog: {
        isOpen: true,
        title: title,
        subTitle: subtitle,
        onConfirm: onconfirm,
        onDiscard: () => this.discard(type),
      },
    });
  };

  discard = (type) => {
    if (type === 'update' || type === 'delete') {
      this.setState({
        confirmDialog: {
          isOpen: false,
          title: '',
          subTitle: '',
          onConfirm: null,
          onDiscard: null,
        },
      });
    } else if (type === 'toggle') {
      this.setState({
        confirmDialog: {
          isOpen: false,
          title: '',
          subTitle: '',
          onConfirm: null,
          onDiscard: null,
        },
        toggle: !this.state.toggle,
      });
    }
  };

  handleToggle = (event) => {
    this.setState({
      toggle: event.target.checked,
    });
    let title;
    let message;
    if (event.target.checked) {
      title = 'Autoriser les étudiants à répondre au quiz ?';
      message = 'Les étudiants peuvent répondre au quiz maintenant';
    } else {
      title = 'Voulez-vous fermer le quiz ?';
      message = 'Les étudiants ne peuvent pas répondre au quiz maintenant';
    }
    this.setState({
      confirmDialog: {
        isOpen: true,
        title: title,
        subTitle: this.state.subTitle,
        onConfirm: () => this.allowQuiz(message),
        onDiscard: () => this.discard('toggle'),
      },
    });
  };

  allowQuiz = (message) => {
    let allow = this.state.toggle;
    const quiz_id = this.state.currentQuiz.quiz_id;
    axios
      .post(
        `https://neuroeducation-feedback.herokuapp.com/api/allowQuiz/${quiz_id}`,
        {
          allow,
        }
      )
      .then((response) => {
        let success;
        if (allow) {
          success = allow;
        } else {
          success = false;
        }
        this.setState({
          message: message,
          open: true,
          successful: success,
          toggle: allow,
        });
      })
      .catch(function (err) {
        console.log(err.response.data.message || err.response);
      });

    this.setState({
      confirmDialog: {
        isOpen: false,
        title: '',
        subTitle: '',
        onConfirm: null,
        onDiscard: null,
      },
    });
  };

  updateQuiz = (event) => {
    event.preventDefault();
    let updated_questions = [];

    for (let i = 0; i <= 100; i++) {
      if (document.getElementById('Q' + i) === null) {
        break;
      }
      var id = document.getElementById('Q' + i).value;

      let expArr = [];
      for (let j = 1; j <= 20; j++) {
        let alphabet = String.fromCharCode(96 + j);
        let expId = 'Q' + i + 'E' + alphabet;

        if (document.getElementById(expId) === null) {
          break;
        } else {
          var exp = document.getElementById(expId).value;
          expArr.push({
            options_id: alphabet,
            options_text: exp,
          });
        }
      }
      updated_questions.push({
        question_id: (i+1),
        question_title: id,
        question_options: expArr,
      });
    }

    const quiz_id = document.getElementById('quiz_id').value;
    axios
      .post(
        `https://neuroeducation-feedback.herokuapp.com/api/updateQuiz/${quiz_id}`,
        {
          updated_questions,
        }
      )
      .then((response) => {
        this.setState({
          message: 'Quiz mis à jour.',
          open: true,
          successful: true,
        });
      })
      .catch(function (err) {
        console.log(err.response.data.message || err.response);
        this.setState({
          message: 'Quiz non mis à jour.',
          open: true,
          successful: false,
        });
      });

    this.setState({
      confirmDialog: {
        isOpen: false,
        title: '',
        subTitle: '',
        onConfirm: null,
        onDiscard: null,
      },
    });
  };

  deleteQuiz = () => {
    const id = this.state.currentQuiz.quiz_id;
    const email = this.state.currentQuiz.created_by;
    axios
      .delete(
        `https://neuroeducation-feedback.herokuapp.com/api/delete/${id}/${email}`
      )
      .then((res) => {
        this.setState({
          open: true,
          message: 'Quiz supprimé',
          danger: true,
          successful: null,
          allQuizzes: this.state.allQuizzes.filter(
            (question) => question.quiz_id !== id
          ),
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          message: 'Quiz non supprimé... veuillez réessayer',
          open: true,
          successful: false,
        });
      });
    this.setState({
      confirmDialog: {
        isOpen: false,
        title: '',
        subTitle: '',
        onConfirm: null,
        onDiscard: null,
      },
    });

    this.backToQuizzes();
  };

  editQuiz = () => {
    this.setState({
      edit: true,
      displayQuiz: false,
    });

  };

  addQuestionEdit = () => {
    this.setState(
      prevState => ({ currentQuizQuestions: [...prevState.currentQuizQuestions, 
        {
          question_id: (this.state.currentQuizQuestions.length + 1),
          question_title : "",
          question_options: []
        }
      
      ]})
  )
  }

  deleteQuestionEdit = (index) => {
    let currentQuizQuestions  = [...this.state.currentQuizQuestions];
    if (index !== -1) {
      currentQuizQuestions.splice(index, 1);
      this.setState({
        currentQuizQuestions
      });
    }
  }

  addExplanationEdit = (index) => {
    let currentQuizQuestions  = [...this.state.currentQuizQuestions];
    const indexExplanation = currentQuizQuestions[index].question_options.length;
    let alphabet = String.fromCharCode(96 + (indexExplanation + 1));

    let newExplanation = currentQuizQuestions[index].question_options;
    newExplanation.push(
      {
        options_id : alphabet,
        options_text : ""
      }
    );

    currentQuizQuestions[index].question_options =  newExplanation;
    this.setState({
      currentQuizQuestions 
    });
  } 


  deleteExplanationEdit = (questionIndex, explanationIndex) => {
    let currentQuizQuestions  = [...this.state.currentQuizQuestions];

    if (explanationIndex !== -1) {
      currentQuizQuestions[questionIndex].question_options.splice(explanationIndex, 1);
      this.setState({
        currentQuizQuestions
      });
    }
  }

  handleOnchangeExpEdit=(questionIndex, explanationIndex,e)=>{
    let currentQuizQuestions  = [...this.state.currentQuizQuestions]; 

    currentQuizQuestions[questionIndex].question_options[explanationIndex].options_text =  e.target.value;
    this.setState({
      currentQuizQuestions 
    });
    
}

handleOnchangeQuesEdit=(questionIndex,e)=>{
  let currentQuizQuestions  = [...this.state.currentQuizQuestions]; 

  currentQuizQuestions[questionIndex].question_title =  e.target.value;
  this.setState({
    currentQuizQuestions 
  });
  
}

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleQuestionChange(indexQuestion, question) {
    let questions = [...this.state.questions];
    questions[indexQuestion].question_title = question;
    questions[indexQuestion].question_id = indexQuestion + 1;
    this.setState({
      questions,
    });
  }

  handleExplanationChange(indexQuestion, indexExplanation, explanation) {
    let questions = [...this.state.questions];
    questions[indexQuestion].question_options[indexExplanation].options_text =
      explanation;

    let alphabet = String.fromCharCode(96 + (indexExplanation + 1));
    questions[indexQuestion].question_options[indexExplanation].options_id =
      alphabet;

    this.setState({
      questions,
    });
  }

  onChangeTitle(e) {
    let title = e.target.value;
    this.setState({
      title,
    });
  }

  onClickAddQuestion() {
    this.setState((prevState) => ({
      questions: [
        ...prevState.questions,
        {
          question_title: '',
          question_options: [],
        },
      ],
    }));
  }

  handleAddExplanationClick(indexQuestion) {
    let questions = [...this.state.questions];
    questions[indexQuestion].question_options.push({ options_text: '' });
    this.setState({
      questions,
    });
  }

  handleRemoveExplanationClick(indexQuestion, indexExplanation) {
    let questions = [...this.state.questions];
    questions[indexQuestion].question_options.splice(indexExplanation, 1);
    this.setState({
      questions,
    });
  }

  onClickDelQuestion(indexQuestion) {
    let questions = [...this.state.questions];
    questions.splice(indexQuestion, 1);
    this.setState({
      questions,
    });
  }

  handleSubmit() {
    const { currentUser } = this.state;

    PostForm.submit(
      this.state.title,
      currentUser.message.email,
      this.state.questions
    ).then(
      (response) => {
        this.setState({
          message: 'Quiz submitted',
          submitted: true,
          quizMdp: response.quizMdp,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage,
          questions: [
            {
              question_title: '',
              question_options: [],
            },
          ],
        });
      }
    );
  }

  createQuestionUI() {
    return this.state.questions.map((element, indexQuestion) => (
      <div className="questionContainer">
        <div className="container" key={indexQuestion}>
          <MyForm
            onQuestionChange={this.handleQuestionChange.bind(
              this,
              indexQuestion
            )}
            onTitleChange={this.handleTitleChange}
            onExplanationChange={this.handleExplanationChange.bind(
              this,
              indexQuestion
            )}
            onAddExplanationClick={this.handleAddExplanationClick.bind(
              this,
              indexQuestion
            )}
            onRemoveExplanationClick={this.handleRemoveExplanationClick.bind(
              this,
              indexQuestion
            )}
            explanations={this.state.questions[indexQuestion].question_options}
            delete={this.onClickDelQuestion.bind(this, indexQuestion)}
          />
          {/* <div className="delQuestion">
            <StyledButtonDelQuestion
              variant = "contained" onClick = {this.onClickDelQuestion.bind(this, indexQuestion)}>Supprimer cette question
            </StyledButtonDelQuestion>
          </div> */}
        </div>
      </div>
    ));
  }

  // Pourrait être utile plus tard donc je met de coté (deprecated)
  // componentDidMount() {
  //   UserService.getAdminBoard().then(
  //     response => {
  //       this.setState({
  //         content: response.data
  //       });
  //     },
  //     error => {
  //       this.setState({
  //         content:
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString()
  //       });
  //     }
  //   );
  // }

  render() {
    const title = this.state.title;
    const currentUser = this.state.currentUser;
    const allQuizzes = this.state.allQuizzes;
    const displayQuizzes = this.state.displayQuizzes;
    const displayCreate = this.state.displayCreate;
    const displayQuiz = this.state.displayQuiz;
    const currentQuiz = this.state.currentQuiz;
    const currentQuizQuestions = this.state.currentQuizQuestions;


    // redirect to post/SubmitForm
    if (this.state.submitted === true) { 
      return (
        <Redirect
          to={{
            pathname: '/postSubmitForm',
            state: { quizMdp: this.state.quizMdp },
          }}
        />
      );
    }

    return (
      <div className="mainTeacherForm">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={() => this.handleClose()}
        >
          <Alert
            onClose={() => this.handleClose()}
            severity={this.state.successful ? 'success' : 'warning'}
          >
            {this.state.message}
          </Alert>
        </Snackbar>

        {this.state.confirmDialog.isOpen && (
          <ConfirmDialogue
            confirmDialog={this.state.confirmDialog}
            setConfirmDialog={this.state.confirmDialog}
          />
        )}

        {(displayQuizzes === false || displayQuizzes) && (
          <div className="">
                <SnackbarContent
                  style={{
                    backgroundColor: 'white',
                    position: 'sticky',
                    top: '0',
                    'zIndex': '999',
                  }}
                  message=""
                  action={
                    <button className="btnn" onClick={this.createQuiz}>
                      Créer un nouveau Quiz
                    </button>
                  }
                />

            {allQuizzes && displayQuizzes && (
              <div>

                <div>
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <Title
                      data={
                        'Quizs Créé par : ' +
                        currentUser.message.firstname +
                        ' ' +
                        currentUser.message.lastname
                      }
                    />
                    <div className="row">
                      {allQuizzes &&
                        allQuizzes.map((quiz, index) => (
                          <div
                            key={index}
                            className="col-xs-12 col-sm-12 col-md-6 col-lg-4"
                            onClick={() => this.getQuiz(quiz.quiz_id)}
                          >
                            <Card
                              className="card"
                              elevation={1}
                              style={{
                                padding: '20px',
                                'margin-bottom': '10px',
                              }}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    style={{ backgroundColor: '#4257b2' }}
                                  >
                                    {quiz.quiz_id[0].toUpperCase()}
                                  </Avatar>
                                }
                                title={quiz.quiz_id}
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
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {displayQuizzes === false && (
              <div>
                {/* <h4>{'Quizs Créé par : '}</h4>
                <h4>
                  {' '}
                  {currentUser.message.firstname +
                    ' ' +
                    currentUser.message.lastname}
                </h4> */}
                <div className={`quiz`} style={{ borderRadius: '10px' }}>
                  <h4>Pas de quizz créé pour le moment</h4>
                </div>
              </div>
            )}
            {/* <button className="btnn" onClick={this.createQuiz}>Créer un nouveau Quiz</button> */}
          </div>
        )}

        {(displayQuiz || this.state.edit) && currentQuiz && (
          <div className="container-questions">
            <MenuOption options={this.state.menuOptions}></MenuOption>
            <Tooltip title="Back to list">
              <IconButton
                aria-label="back"
                style={{ color: '#4257b2' }}
                onClick={this.backToQuizzes}
              >
                <ArrowBackIcon fontsize="large" />
              </IconButton>
            </Tooltip>
            {/* <button className="btnn"  onClick={this.backToQuizzes}><ArrowBackIcon fontsize="large"/></button>  */}

            {/* <button className="btnn"  onClick={this.deleteQuiz}><DeleteForeverIcon fontsize="large"/></button>  */}
            {/* <button className="btnn"  onClick={this.editQuiz}>Edit Quiz</button> */}
            <p>
              {currentQuiz.quiz +
                (this.state.toggle ? ' est ouvert' : ' est fermé')}
              <Switch
                checked={this.state.toggle}
                onChange={this.handleToggle}
                name="switch"
                inputProps={{ 'aria-label': 'test switch' }}
                style={{ color: '#4257b2' }}
                color="primary"
              />
            </p>

            {currentQuiz && this.state.edit && (
              <div>
                <Form id="myForm">
                  <div className="container">
                    <div className="form-group">
                      <center>
                        <h5>{currentQuiz.quiz}</h5>
                        <br />
                      </center>

                      <input
                        type="text"
                        className="form-control"
                        name="quiz_id"
                        id="quiz_id"
                        value={currentQuiz.quiz_id}
                        readOnly
                      />
                      {currentQuizQuestions &&
                        currentQuizQuestions.map((questions, indexx) => (
                          <div key={indexx}>
                            <label htmlFor={'Q' + indexx}>
                              <strong>
                                {'Question : ' + (indexx + 1)}
                              </strong>
                              <span style={{float: "right"}}>
                              <Tooltip title="Adjouter une explication">
                                <IconButton
                                  onClick={this.addExplanationEdit.bind(this, indexx)}
                                  style={{ color: '#4257b2', float: 'left', marginBottom: '15px' }} 
                                >
                                  <QueueIcon />
                                </IconButton>
                              </Tooltip>
                              
                              <Tooltip title="Supprimer cette question">
                                <IconButton
                                  className="deleteQuestion"
                                  onClick={this.deleteQuestionEdit.bind(this, indexx)}
                                  style={{ float: 'right' }}
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Tooltip>
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name={'Q' + indexx}
                              id={'Q' + indexx}
                              value={questions.question_title}
                              onChange = {this.handleOnchangeQuesEdit.bind(this,indexx)}
                              validations={[required]}
                              autoComplete="off"
                            />

                            {questions.question_options &&
                              questions.question_options.map(
                                (options, index) => (
                                  <div  className="form-group">
                                    <label
                                      htmlFor={
                                        'Q' +
                                        indexx +
                                        'E' +
                                        index
                                      }
                                    >
                                      <strong>
                                        {'Explanation : ' + String.fromCharCode(96 + (index + 1))}
                                      </strong>
                                    </label>

                                    
                                    <div class="input-group">
                                     <div style={{width: "85%"}}> 
                                    <input
                                      type="text"
                                      className="form-control"
                                      name={
                                        'Q' +
                                        indexx +
                                        'E' +
                                        String.fromCharCode(96 + (index + 1))
                                      }
                                      id={
                                        'Q' +
                                        indexx +
                                        'E' +
                                        String.fromCharCode(96 + (index + 1))
                                      }
                                      value={options.options_text}
                                      onChange = {this.handleOnchangeExpEdit.bind(this, indexx,index)}
                                      // validations={[required]}
                                      // autoComplete="off"
                                    />
                                    </div>
                                    <div>  
                                    <Tooltip title="Supprimer cette explication">
                                      <button
                                        type="button"
                                        id="buttonExp"
                                        className="form-control"
                                        onClick={this.deleteExplanationEdit.bind(
                                          this,
                                          indexx,
                                          index
                                        )}
                                      >
                                        <DeleteForeverIcon style={{ color: 'red' }} />{' '}
                                      </button>
                                    </Tooltip>
                                    </div>
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                </Form>

                <button  className="btnn" style={{backgroundColor: "gray"}} onClick={this.addQuestionEdit}>Ajouter une question</button>


                <button
                  className="btnn"
                  onClick={() =>
                    this.setConfirmDialog(
                      'update',
                      'Voulez-vous modifier ce questionnaire ?',
                      'Vous pouvez modifier à nouveau',
                      this.updateQuiz
                    )
                  }
                >
                  Modifier
                </button>
              </div>
            )}

            <div>
              {currentQuiz && displayQuiz && (
                <div>
                  <center>
                    <h4>{currentQuiz.quiz}</h4>
                    <br />
                  </center>
                  {currentQuiz.questions &&
                    currentQuiz.questions.map((questions, indexx) => (
                      <div key={questions.question_id}>
                        <p>
                          <strong>
                            {questions.question_id}
                            {'. '}
                            {questions.question_title}
                          </strong>
                        </p>

                        <div>
                          {questions.question_options &&
                            questions.question_options.map((options, index) => (
                              <div>
                                <label>
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
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          {displayCreate && (
            <div>
              <div
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  'justify-content': 'center',
                }}
              >
                <button id="backButton" onClick={this.backToQuizzes}>
                  <ArrowBackIcon fontsize="large" />
                </button>

                <SnackbarContent
                  style={{
                    width: '100%',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: '#4257b2',
                    backgroundColor: 'white',
                    position: 'sticky',
                    top: '0',
                    'zIndex': '999',
                  }}
                  message="Création de nouvelles questions"
                  action={
                    <button
                      className="btnn"
                      variant="contained"
                      onClick={this.handleSubmit}
                    >
                      Valider
                    </button>
                  }
                />
              </div>
              {/* <div className="container">
              <header className="jumbotron">
                <h3>Création de nouvelles questions</h3>
              </header>
            </div> */}

              <Form>
                <div className="container">
                  <div className="form-group">
                    <label htmlFor="form-title">
                      <strong>Titre du formulaire</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="form-title"
                      value={title}
                      onChange={this.onChangeTitle}
                      validations={[required]}
                      autoComplete="off"
                    />
                  </div>
                </div>

                {this.createQuestionUI()}

                <div className="container">
                  <br></br>
                  <SnackbarContent
                    style={{ backgroundColor: 'white' }}
                    message=""
                    action={
                      <button
                        className="btnn"
                        type="button"
                        onClick={this.onClickAddQuestion}
                      >
                        Ajouter une question
                      </button>
                    }
                  />
                  {/* <StyledButtonAddQuestion
                    variant = "contained" onClick = {this.onClickAddQuestion}>Ajouter une question
                </StyledButtonAddQuestion>
                <br></br><br></br>
                <StyledButtonSubmit
                  variant = "contained" onClick = {this.handleSubmit}>Valider
                </StyledButtonSubmit> */}
                </div>
              </Form>

              {this.state.message && (
                <div className="container">
                  <div className="itsanerror">
                    <h3>
                      Une erreur est survenu lors de l'envoi du formulaire
                    </h3>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
