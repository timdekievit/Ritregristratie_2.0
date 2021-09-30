import axios, { AxiosResponse } from 'axios';
import { Ride } from '../models/ride';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody), 
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody), 
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody), 
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody), 
}

const Rides = {
    list: () => request.get<Ride[]>('/rides'),
    details: (id: string) => request.get<Ride>(`rides/${id}`),
    create: (ride: Ride) => request.post<void>('/rides', ride),
    update: (ride: Ride) => request.put<void>(`/rides/${ride.id}`, ride),
    delete: (id: string) => request.del<void>(`rides/${id}`)
}

const agent = {
    Rides
}

export default agent;