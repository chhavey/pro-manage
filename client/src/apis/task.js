import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

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

export { fetchAnalytics };