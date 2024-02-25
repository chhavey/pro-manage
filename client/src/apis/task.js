import axios from 'axios';
import { backendUrl } from '../config/config';
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const filterTasks = async (filterType) => {
    try {

        const reqUrl = `${backendUrl}/task/filter`;
        const response = await axios.get(reqUrl, {
            params: {
                filterType
            },
            headers: {
                Authorization: token,
            },
            data: {
                userId
            },
        });

        return response.data;

    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else if (error.message === 'Internal Server Error') {
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        } else {
            throw new Error('Cannot fetch tasks. Please try again later.');
        }
    }
}

const deleteTask = async (taskId) => {
    try {
        const reqUrl = `${backendUrl}/task/${taskId}`;
        const response = await axios.delete(reqUrl, {
            params: {
                taskId
            },
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    } catch (error) {
        console.log('lol no');
    }
}

const fetchAnalytics = async () => {
    try {
        const reqUrl = `${backendUrl}/task/analytics`;
        const response = await axios.get(reqUrl,
            {
                headers: {
                    'Authorization': token,
                }, data: {
                    userId: userId
                }
            }
        );

        return response.data.data;
    }
    catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else if (error.message === 'Internal Server Error') {
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        } else {
            throw new Error('Cannot fetch analytics. Please try again later.');
        }
    }
}

export { filterTasks, deleteTask, fetchAnalytics };