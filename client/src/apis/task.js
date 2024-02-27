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

const fetchTask = async (taskId) => {
    try {
        const reqUrl = `${backendUrl}/task/${taskId}`;
        const response = axios.get(reqUrl, {
            params: { taskId }
        });
        return response;
    } catch (error) {
        console.log('Couldnt fetch task');
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

const updateSubtaskStatus = async (taskId, subtaskIndex, isDone) => {
    try {
        const reqUrl = `${backendUrl}/task/subtask`;
        const response = await axios.post(reqUrl, {
            taskId,
            subtaskIndex,
            isDone
        }, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update subtask status');
    }
};

const updateStatus = async (taskId, status) => {
    try {
        const reqUrl = `${backendUrl}/task/taskStatus`;
        const response = await axios.post(reqUrl, {
            taskId,
            status
        }, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update task status');
    }
};

export { filterTasks, deleteTask, fetchTask, fetchAnalytics, updateSubtaskStatus, updateStatus };