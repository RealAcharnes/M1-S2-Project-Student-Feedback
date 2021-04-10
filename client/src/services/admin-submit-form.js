import axios from "axios";

const API_URL = "https://neuroeducation-feedback.herokuapp.com/api/postform/";
// const API_URL = "http://localhost:5050/api/postform/";

class PostForm {
    submit(title, created_by, questions) {
        return axios
            .post(API_URL + "submit", {
                title,
                created_by,
                questions
            })
            .then(response => {
                return response.data;
            });
    }
}

export default new PostForm();
