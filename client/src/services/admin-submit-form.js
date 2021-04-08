import axios from "axios";

const API_URL = "https://neuroeducation-feedback.herokuapp.com/api/postform/";

class PostForm {
    submit(title, questions) {
        return axios
            .post(API_URL + "submit", {
                title,
                questions
            })
            .then(response => {
                return response.data;
            });
    }
}

export default new PostForm();
