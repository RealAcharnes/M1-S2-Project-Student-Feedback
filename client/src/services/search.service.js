import axios from "axios";

const API_URL = "https://neuroeducation-feedback.herokuapp.com/api/";

class SearchService {

  searchQuiz(search) {
    return axios.get(API_URL + "searchQuiz", {
      search
    });
  }


}

export default new SearchService();
