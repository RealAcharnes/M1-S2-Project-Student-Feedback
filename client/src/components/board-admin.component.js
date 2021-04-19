import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button, Snackbar, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PostForm from "../services/admin-submit-form";
import AuthService from "../services/auth.service";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem,ListItemIcon, ListItemText } from '@material-ui/core';
import BookOutlined from '@material-ui/icons/BookOutlined';
import SearchService from "../services/search.service";
import ConfirmDialogue from "./confirm-dialogue";
import MuiAlert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuOption from "./menu";
import EditIcon from '@material-ui/icons/Edit';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


// Here is 5 constants related to the visual of our custom button
const StyledButtonAddExplanation = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 15,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: '5px 15px',
  },
  label: {
    textTransform: 'none',
  },
})(Button);

const StyledButtonAddQuestion = withStyles({
  root: {
    background: 'linear-gradient(45deg, #00BCFF 30%, #5355FF 90%)',
    borderRadius: 15,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: '5px 15px',
  },
  label: {
    textTransform: 'none',
  },
})(Button);

const StyledButtonDelExplanation = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FF8700 30%, #FF1E1E 90%)',
    borderRadius: 15,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: '5px 15px',
  },
  label: {
    textTransform: 'none',
  },
})(Button);

const StyledButtonDelQuestion = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FF1D1D 30%, #4C4C4C 90%)',
    borderRadius: 15,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: '5px 15px',
  },
  label: {
    textTransform: 'none',
  },
})(Button);

const StyledButtonSubmit = withStyles({
  root: {
    background: 'linear-gradient(45deg, #11FF00 30%, #00FF82 90%)',
    borderRadius: 15,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: '5px 15px',
  },
  label: {
    textTransform: 'none',
  },
})(Button);

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire !
      </div>
    );
  }
};

class MyForm extends Component {
  constructor(props){
    super(props);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onClickAddExplanation = this.onClickAddExplanation.bind(this);

    this.state = {
      explanations: false
    };
  }

  onChangeQuestion(e){
    this.props.onQuestionChange(e.target.value);
  }

  onChangeExplanation(indexExplanation, e){
    this.props.onExplanationChange(indexExplanation, e.target.value)
  }

  onClickRemoveExplanation(indexExplanation){
    this.props.onRemoveExplanationClick(indexExplanation);
  }

  onClickAddExplanation(){
    this.props.onAddExplanationClick();
    this.setState({
      explanations: true
    });
  }
  
  createExplanationUI(){
    return(
      <div>
          {this.props.explanations ?(this.props.explanations.map((element, indexExplanation) =>
            <div>
              <div key={indexExplanation} className="form-group">
                <label htmlFor="explanation">Explication</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="explanation"
                    value = {element.options_text||''}
                    onChange = {this.onChangeExplanation.bind(this, indexExplanation)}
                    validations = {[required]}
                    autoComplete = "off"
                  />
              </div>

              <StyledButtonDelExplanation 
                variant = "contained" onClick = {this.onClickRemoveExplanation.bind(this, indexExplanation)}>Supprimer cette explication
              </StyledButtonDelExplanation>


            </div>
            )) : (<h3>No Explanation props</h3>)
          }
      </div>
    )
  }

  render(){

    const question = this.state.question;

    return (
      <div>
        <Form>

          <div className="form-group">
            <label htmlFor="question"><strong>Question</strong></label>
            <Input
              type="text"
              className="form-control"
              name="question"
              value = {question}
              onChange = {this.onChangeQuestion}
              validations = {[required]}
              autoComplete = "off"
            />
          </div>

          <StyledButtonAddExplanation
            variant = "contained" onClick = {this.onClickAddExplanation}>Ajouter une explication
          </StyledButtonAddExplanation>
          
          {
            this.state.explanations &&
              this.createExplanationUI()
          }

        </Form>

      </div>
      
    )
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

    this.state = {
      title: '',
      created_by: '',
      questions: [
        {
          question_id: '',
          question_title: '',
          question_options: []
        }
      ],
      message: '',
      currentUser: undefined,
      submitted: false,
      quizMdp:'',
      allQuizzes: null,
      displayQuizzes: null,
      errorMessage: '',
      laststate: null,
      confirmDialog: {
        isOpen:false,
        title:'',
        subTitle:''
      },
      updateTitle: "Are you sure you want to update?",
      updateSubTitle : "You will be able to edit again"
    };
  }

  componentDidMount() {

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    axios.get(`https://neuroeducation-feedback.herokuapp.com/api/studentQuizzes/${user.message.email}`).then((response) => {
            console.log(response.data.quizzes);
            if((response.data.quizzes).length ){
                // setallQuizzes(response.data.quizzes)
                // setdisplayQuizzes(true); 
                this.setState({
                  allQuizzes: response.data.quizzes,
                  displayQuizzes: true
                });
                // console.log(response.data.quizzes)
            }
            else{
                // setallQuizzes(null)
                // setdisplayQuizzes(false)  
                this.setState({
                  allQuizzes: null,
                  displayQuizzes: false
                });
            }
          })
          .catch(function (err) {
              // seterrorMessage(err.response.data.message|| err.response.data.message[0].error);
              this.setState({
                errorMessage: err.response.data.message|| err.response.data.message[0].error,
              });
          });

          this.setState({
            menuOptions : [
              {
                title: "Back",
                icon : <ArrowBackIcon fontsize="large"/>,
                onclick : this.backToQuizzes
              },
              {
                title: "Edit",
                icon : <EditIcon fontsize="large"/>,
                onclick : this.editQuiz
              },
              {
                title: "Delete",
                icon : <DeleteForeverIcon fontsize="large"/>,
                onclick : this.deleteQuiz
              }
            ]
          })
  }

  createQuiz = () => {
    this.setState({
      laststate: this.state.displayQuizzes,
      displayQuizzes : null,
      displayCreate : true,
      displayQuiz: false,

    })
  }

  backToQuizzes = () => {
    this.setState({
      displayQuizzes: this.state.laststate,
      displayCreate: false,
      displayQuiz: false,
      edit: false

    })
  }

  getQuiz = (quiz_idd) => {
    SearchService.searchQuiz(
      quiz_idd,
    ).then(
      response => {
        console.log(response);
        // setsuccessful(true);
        // setcurrentQuiz(response.data);
        this.setState({
          displayQuiz: true,
          laststate: this.state.displayQuizzes,
          currentQuiz: response.data,
          toggle: response.data.allow,
          displayQuizzes : null,
          displayCreate: false,
        })
      })
      .catch(
      error => {
        console.log(error.response);
        const resMessage =
          (error.response && error.response.data && error.response.data.message) 
          || error.message || error.toString();

        // setmessage(resMessage);
        // setsuccessful(false);
        this.setState({
          message: resMessage,
          successful: false
        })
      }
    );
  }

  setConfirmDialog = () => {
        this.setState({
          confirmDialog: {
            isOpen: true,
            title: "Do you want to Edit this Quiz?",
            subTitle: "You can edit again",
            onConfirm: this.updateQuiz,
            onDiscard: ()=>this.discard("update")
          }
        })
  }

  discard = (type) => {
    if(type==="update"){
      this.setState({
        confirmDialog: {
          isOpen: false,
          title: '',
          subTitle: "",
          onConfirm: null,
          onDiscard: null
        }
      })
    }
    else if(type==="toggle"){
      this.setState({
        confirmDialog: {
          isOpen: false,
          title: '',
          subTitle: "",
          onConfirm: null,
          onDiscard: null
        },
         toggle: !this.state.toggle
      })
    }
  }


  handleToggle = (event) =>{
    this.setState({
      toggle: event.target.checked
    })
    let title;
    let message;
    if(event.target.checked){
      title = "Allow Students to take Quiz?";
      message = "Students Can Take Quiz now"
    }
    else{
      title = "Do you want to Close Quiz?"
      message = "Students Cannot Take Quiz now"
    }
    this.setState({
      confirmDialog: {
        isOpen: true,
        title: title,
        subTitle: this.state.subTitle,
        onConfirm: () => this.allowQuiz(message),
        onDiscard: ()=> this.discard("toggle")
      }
    })

  }

  allowQuiz = (message) => {
    let allow = this.state.toggle
    console.log(allow)
    const quiz_id = this.state.currentQuiz.quiz_id;
    axios.post(`https://neuroeducation-feedback.herokuapp.com/api/allowQuiz/${quiz_id}` , {
      allow
    })
    .then((response) => {
      console.log(response.data);
      let success;
      if(allow){
        success = allow
      }
      else{
        success=allow
      }
      this.setState({
        message: message,
        open:true,
        successful:success,
        toggle: allow
      })
    })
    .catch(function (err) {
        // this.setState({
        //   toggle: !this.state.toggle
        // });
        console.log(err.response.data.message|| err.response);
    });
    
    this.setState({
      confirmDialog: {
        isOpen: false,
        title: '',
        subTitle: "",
        onConfirm: null,
        onDiscard: null
      }
    })
  }

  updateQuiz = (event) =>{
    event.preventDefault();
    let updated_questions = [];

    for(let i=1;i<=5;i++){
      if(document.getElementById('Q'+i) === null){
        break
      }
      var id = document.getElementById('Q'+i).value;

      let expArr = [];
      for(let j=1;j<=20;j++){
        let alphabet = String.fromCharCode(96 + (j));
        let expId = 'Q'+i+'E'+alphabet;

        if(document.getElementById(expId) === null){
          break
        }
        else{
        var exp = document.getElementById(expId).value;
        expArr.push({
          options_id : alphabet,
          options_text : exp
        })}
      }
      updated_questions.push({question_id:i, question_title: id, question_options : expArr})
    }

    console.log(updated_questions)
    const quiz_id = document.getElementById("quiz_id").value;
    console.log(quiz_id)
    axios.post(`https://neuroeducation-feedback.herokuapp.com/api/updateQuiz/${quiz_id}` , {
      updated_questions
    })
    .then((response) => {
      console.log(response.data);
      this.setState({
        message: "Quiz Updated",
        open: true,
        successful:true
      })
    })
    .catch(function (err) {
        console.log(err.response.data.message|| err.response);
        this.setState({
          message: "Quiz Not Updated",
          open:true,
          successful: false
        })
    });
    
    this.setState({
      confirmDialog: {
        isOpen: false,
        title: '',
        subTitle: "",
        onConfirm: null,
        onDiscard: null
      }
    })
  }


  deleteQuiz=()=> {
    this.setState({
      open: true,
      message: "Not Functional Yet",
      danger: true,
      successful:null
    })
  }

  editQuiz=()=>{
    this.setState({
      edit: true,
      displayQuiz: false
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleQuestionChange(indexQuestion, question){
    let questions = [...this.state.questions];
    questions[indexQuestion].question_title = question;
    questions[indexQuestion].question_id = indexQuestion+1;
    this.setState({
      questions
    });
  }

  handleExplanationChange(indexQuestion, indexExplanation, explanation){
    let questions = [...this.state.questions];
    questions[indexQuestion].question_options[indexExplanation].options_text = explanation;
    
    let alphabet = String.fromCharCode(96 + (indexExplanation+1));
    questions[indexQuestion].question_options[indexExplanation].options_id = alphabet;
    
    this.setState({
      questions
    })
  }

  onChangeTitle(e){
    let title = e.target.value;
    this.setState({
      title
    });
  }

  onClickAddQuestion(){
    this.setState(
      prevState => ({questions : [...prevState.questions,        
        {
        question_title: '',
        question_options: []
      }]})
    );
  }

  handleAddExplanationClick(indexQuestion){
    let questions = [...this.state.questions];
    questions[indexQuestion].question_options.push({options_text : ''});
    this.setState({
      questions
    })
  }

  handleRemoveExplanationClick(indexQuestion, indexExplanation){
    let questions = [...this.state.questions];
    questions[indexQuestion].question_options.splice(indexExplanation, 1);
    this.setState({
      questions
    });
  }

  onClickDelQuestion(indexQuestion){
    let questions = [...this.state.questions];
    questions.splice(indexQuestion, 1);
    this.setState({
      questions
    });
  }

  handleSubmit(){

    const { currentUser} = this.state;

    PostForm.submit(this.state.title, currentUser.message.email, this.state.questions).then(
      (response) => {
        // this.props.history.push({
        //   pathname: "/postSubmitForm",
        //   state:{quizMdp: response.quizMdp}
        // })
        // window.location.reload();
       console.log(response);
        this.setState({
          message: 'Quiz submitted',
          submitted: true,
          quizMdp:response.quizMdp
        });
      },
      error => {
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
              question_options: []
            }
          ]
        });
      }
    );
  }

  createQuestionUI(){

    return(this.state.questions.map((element, indexQuestion) => 
      <div className="questionContainer">
        <div className="container" key={indexQuestion}>
          <MyForm 
            onQuestionChange = {this.handleQuestionChange.bind(this, indexQuestion)}
            onTitleChange = {this.handleTitleChange}
            onExplanationChange = {this.handleExplanationChange.bind(this, indexQuestion)}
            onAddExplanationClick = {this.handleAddExplanationClick.bind(this, indexQuestion)}
            onRemoveExplanationClick = {this.handleRemoveExplanationClick.bind(this, indexQuestion)}
            explanations = {this.state.questions[indexQuestion].question_options}
          />
          <div className="delQuestion">
            <StyledButtonDelQuestion
              variant = "contained" onClick = {this.onClickDelQuestion.bind(this, indexQuestion)}>Supprimer cette question
            </StyledButtonDelQuestion>
          </div>
        </div>
      </div>
      )
    )
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
    const currentQuiz = this.state.currentQuiz




    // redirect to post/SubmitForm
    if(this.state.submitted===true){
      return <Redirect to={{ pathname: "/postSubmitForm", state: { quizMdp: this.state.quizMdp } }} />
    }

    



    return (
      <div className="mainTeacherForm">

        <Snackbar anchorOrigin={{ vertical :'top', horizontal: 'center' }}open={this.state.open} autoHideDuration={6000} onClose={()=>this.handleClose()}>
          <Alert onClose={()=>this.handleClose()} severity={this.state.successful ? "success" : "warning" }>
            {this.state.message}
          </Alert>
        </Snackbar>

        {
          this.state.confirmDialog.isOpen && 
          <ConfirmDialogue
          confirmDialog={this.state.confirmDialog}
          setConfirmDialog={this.state.confirmDialog}
          />
        }

        {(displayQuizzes===false || displayQuizzes) && 
          <div className="container-questions">
            {(allQuizzes && displayQuizzes) && (
                <div >
                    <h4>{'Quizzes Created by : '}</h4>
                    <h4> {currentUser.message.firstname+" "+currentUser.message.lastname}</h4>
                    <div className={`quiz`} style={{borderRadius: "10px"}}>
                        <List>
                        {allQuizzes && allQuizzes.map((quiz, index) => (
                            <ListItem button  onClick= {()=>this.getQuiz(quiz.quiz_id)}>
                                <ListItemIcon>
                                    <BookOutlined />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <h4>
                                    {quiz.quiz_id} 
                                    </h4>
                                }/>
                            </ListItem>
                        ))}
                        </List>
                    </div>
                </div>
            )}
            {(displayQuizzes===false) && (
              <div>
                  <h4>{'Quizzes Created by : '}</h4>
                  <h4> {currentUser.message.firstname+" "+currentUser.message.lastname}</h4>
                  <div className={`quiz`} style={{borderRadius: "10px"}}>
                      <h4>You have not created any quiz</h4>
                  </div>
              </div>
            )}
            <button className="btnn" onClick={this.createQuiz}>Create new Quiz</button>
          </div>}

        {(displayQuiz || this.state.edit) && currentQuiz &&
          <div className="container-questions">
            <MenuOption options = {this.state.menuOptions}></MenuOption>
            <button className="btnn"  onClick={this.backToQuizzes}><ArrowBackIcon fontsize="large"/></button> 

            {/* <button className="btnn"  onClick={this.deleteQuiz}><DeleteForeverIcon fontsize="large"/></button>  */}
            {/* <button className="btnn"  onClick={this.editQuiz}>Edit Quiz</button> */}
            <p>
                {currentQuiz.quiz + ' is currently ' + (this.state.toggle ? ("allowed") : ("not allowed")) +" to be taken"}             
                <Switch
                checked={this.state.toggle}
                onChange={this.handleToggle}
                name="switch"
                inputProps={{"aria-label":"test switch"}}
                color="primary"
                />
            </p>
            
            {(currentQuiz && this.state.edit) && (
              <div  > 
    
                <Form id="myForm">
                  <div className="container">
                    <div className="form-group">
                      <center><h4 >{currentQuiz.quiz}</h4><br/></center>

                      <Input
                              type="text"
                              className="form-control"
                              name="quiz_id"
                              id="quiz_id"
                              value = {currentQuiz.quiz_id}
                              readOnly
                          /> 
                      {currentQuiz.questions && currentQuiz.questions.map((questions, indexx) => (
                        <div key={questions.question_id}>
                          <label htmlFor={'Q'+questions.question_id}><strong>{'Question : '+questions.question_id}</strong></label>
                          <Input
                              type="text"
                              className="form-control"
                              name={'Q'+questions.question_id}
                              id={'Q'+questions.question_id}
                              value = {questions.question_title}
                              // onChange = {this.onChangeTitle}
                              validations = {[required]}
                              autoComplete = "off"
                          /> 

                          {questions.question_options && questions.question_options.map((options, index) => ( 
                            <div>
                            <label htmlFor={'Q'+questions.question_id+'E'+options.options_id}><strong>{'Explanation : '+options.options_id}</strong></label>
                            <Input
                            type="text"
                            className="form-control"
                            name={'Q'+questions.question_id+'E'+options.options_id}
                            id={'Q'+questions.question_id+'E'+options.options_id}
                            value = {options.options_text}
                            // onChange = {this.onChangeTitle}
                            validations = {[required]}
                            autoComplete = "off"
                            />
                            </div>
                          ))}                  
                        </div>
                      ))}
                    </div>
                  </div>   
                </Form> 
                <button className="btnn" onClick={()=>this.setConfirmDialog("update",this.state.updateTitle,this.state.updateSubTitle)}>Update</button>   
              </div>
              
              )}

              <div >
                {(currentQuiz && displayQuiz) && (
                  <div  > 
                    <center><h4>{currentQuiz.quiz}</h4><br/></center>
                    {currentQuiz.questions && currentQuiz.questions.map((questions, indexx) => (
                      <div key={questions.question_id}>
                        <h4>{questions.question_id}{'. '}{questions.question_title}</h4>    
                      
                          <div>
                            {questions.question_options && questions.question_options.map((options, index) => ( 
                              <div>
                                <label>
                                  <span>{'  '}{options.options_id}{'. '}{options.options_text}</span>
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
        }


        <div>
          {displayCreate && <div> 
            <button className="btnn" onClick={this.backToQuizzes}><ArrowBackIcon fontsize="large"/></button> 
            <div className="container">
              <header className="jumbotron">
                <h3>Création de nouvelles questions</h3>
              </header>
            </div>

            <Form>
              <div className="container">
                <div className="form-group">
                  <label htmlFor="form-title"><strong>Titre du formulaire</strong></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="form-title"
                      value = {title}
                      onChange = {this.onChangeTitle}
                      validations = {[required]}
                      autoComplete = "off"
                    />
                </div>
              </div>


              {this.createQuestionUI()}


              <div className="container">
                <br></br>
                <StyledButtonAddQuestion
                    variant = "contained" onClick = {this.onClickAddQuestion}>Ajouter une question
                </StyledButtonAddQuestion>
                <br></br><br></br>
                <StyledButtonSubmit
                  variant = "contained" onClick = {this.handleSubmit}>Valider
                </StyledButtonSubmit>
              </div>
            </Form>

            { this.state.message && 
              <div className="container">
                <div className="itsanerror"><h3>Une erreur est survenu lors de l'envoi du formulaire</h3></div>
              </div>
            }
          </div>}
        </div>
      </div>
    );
  }
}