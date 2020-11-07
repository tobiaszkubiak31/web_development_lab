import axios from 'axios'
import * as bcryptjs from 'bcryptjs';

const API_URL = 'http://localhost:4000'

export const USER_EMAIL_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const JWT_TOKEN = 'token';

class AuthService {

    logout() {
        localStorage.removeItem(USER_EMAIL_SESSION_ATTRIBUTE_NAME);
        localStorage.removeItem(JWT_TOKEN);
    }

    async loginUser(email, password) {
        return await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password,
        })
        .then((response) => {
            localStorage.setItem(JWT_TOKEN, response.access_token);
            localStorage.setItem(USER_EMAIL_SESSION_ATTRIBUTE_NAME, email);
            return true;
        })
        .catch((error) => {
            return false;
        });
    }

    async registerUser(email, password) {
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);
        let response = await axios.post(`${API_URL}/auth/register`, {
            email: email,
            password: hashedPassword,
        })
        return response.data;
    }
}

export default new AuthService();