import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/postform/";

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