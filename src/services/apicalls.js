import axios from 'axios';

export const getData = async () => {
    const data = await axios.get('https://9a3e-182-180-118-76.ngrok-free.app/users')
    return data.data.data;
}

export const postData = async (dataToPost) => {
    return axios.post('https://9a3e-182-180-118-76.ngrok-free.app/postdata', dataToPost);
}