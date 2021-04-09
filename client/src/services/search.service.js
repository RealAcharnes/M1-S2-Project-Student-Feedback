import axios from "axios";

// const API_URL = "https://neuroeducation-feedback.herokuapp.com/api/";
// const API_URL = "http://localhost:5050/api/${id}";


class SearchService {

  searchQuiz(id) {
    return axios.get(`https://neuroeducation-feedback.herokuapp.com/api/searchQuiz/${id}`, {
      
    });
  }

  submitAnswers(answers){
    axios.post('https://neuroeducation-feedback.herokuapp.com/api/history', {
        answers
      })
  }


}

export default new SearchService();
