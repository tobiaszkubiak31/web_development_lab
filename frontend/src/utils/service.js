import axios from 'axios'

const API_URL = 'http://localhost:4000'

export const USER_EMAIL_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const JWT_TOKEN = 'token';

class AuthService {

    logout() {
        localStorage.removeItem(USER_EMAIL_SESSION_ATTRIBUTE_NAME);
        localStorage.removeItem(JWT_TOKEN);
    }

    async loginUser(email, password) {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password,
        });
        if (response) {
            localStorage.setItem(JWT_TOKEN, response.access_token);
            localStorage.setItem(USER_EMAIL_SESSION_ATTRIBUTE_NAME, email);
            return true;
        }
        return false;
    }

    async registerUser(email, password) {
        const response = await axios.post(`${API_URL}/auth/register`, {
            email: email,
            password: password,
        });

        return response;
    }
}

export default new AuthService();