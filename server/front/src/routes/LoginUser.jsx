import axios from 'axios';

export function LoginUser(dataToSubmit) {

    const request = axios.post('/users', dataToSubmit)
        .then(response => response.data)
        
    return {
        type: "login_user",
        payload: request
    }
}