import axios from "axios";

const API_URL = "http://localhost:5050/api/postform/";

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