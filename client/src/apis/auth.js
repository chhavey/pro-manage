import axios from 'axios';
import { backendUrl } from '../config/config';

const login = async (email, password) => {
    try {
        const reqUrl = `${backendUrl}/user/login`;
        const reqPayload = {
            email: email,
            password: password
        }

        const response = await axios.post(reqUrl, reqPayload);

        if (response.status === 200) {
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("loggedInUser", response.data.data.loggedUser);
            localStorage.setItem("userId", response.data.data.userId);
        }

        return response.data.message;

    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Login failed!');
        }
    }
}

const register = async (name, email, password) => {
    try {
        const reqUrl = `${backendUrl}/user/register`;
        const reqPayload = {
            name: name,
            email: email,
            password: password
        }

        const response = await axios.post(reqUrl, reqPayload);
        return response.data.message;

    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Registration failed!');
        }
    }
}

const settings = async (name, oldPassword, newPassword) => {
    try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const reqUrl = `${backendUrl}/user/settings`;
        const reqPayload = {
            name,
            oldPassword,
            newPassword
        }

        const response = await axios.put(reqUrl, reqPayload, {
            headers: {
                'Authorization': token,
            }, data: {
                userId: userId
            }
        });

        return response.data.message;
    }
    catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Update failed!');
        }
    }

}

export { login, register, settings };