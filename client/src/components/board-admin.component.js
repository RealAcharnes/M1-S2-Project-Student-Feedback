import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PostForm from "../services/admin-submit-form";


// Here is 3 constants related to the visual of our custom button
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
            <label htmlFor="question">Question</label>
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

    this.state = {
      title: '',
      questions: [
        // ['', []]
        {
          question_id: '',
          question_title: '',
          question_options: []
        }
      
      ],
      message: ''
    };
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
     //questions[indexQuestion][1][indexExplanation] = explanation;
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

    PostForm.submit(this.state.title, this.state.questions).then(
      () => {
        this.props.history.push("/postSubmitForm");
        window.location.reload();
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
      <div className="container" key={indexQuestion}>
        
        <MyForm 
          onQuestionChange = {this.handleQuestionChange.bind(this, indexQuestion)}
          onTitleChange = {this.handleTitleChange}
          onExplanationChange = {this.handleExplanationChange.bind(this, indexQuestion)}
          onAddExplanationClick = {this.handleAddExplanationClick.bind(this, indexQuestion)}
          onRemoveExplanationClick = {this.handleRemoveExplanationClick.bind(this, indexQuestion)}
          explanations = {this.state.questions[indexQuestion].question_options}
        />
        <StyledButtonDelQuestion
          variant = "contained" onClick = {this.onClickDelQuestion.bind(this, indexQuestion)}>Supprimer cette question
        </StyledButtonDelQuestion>
        
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

    return (
      <div>

        <div className="container">
          <header className="jumbotron">
            <h3>Création de nouvelles questions</h3>
          </header>
        </div>

        <Form>
          <div className="container">
            <div className="form-group">
              <label htmlFor="form-title">Titre du formulaire</label>
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
      
      </div>
    );
  }
}