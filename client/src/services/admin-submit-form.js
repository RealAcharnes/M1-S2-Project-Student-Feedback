import axios from "axios";

const API_URL = "https://connect-dublin.heroku.com/api/v3postform/";

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
