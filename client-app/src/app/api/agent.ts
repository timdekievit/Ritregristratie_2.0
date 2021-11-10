import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Ride } from '../models/ride';
import { history } from '../..';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { PaginatedResult } from '../models/pagination';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
});

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;

}, (error: AxiosError) => {
const {data, status, config} = error.response!;
console.log(error.response);
switch (status) {
    case 400:
        if (typeof data === 'string') {
            toast.error(data);
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
            history.push('/not-found');
        }
        if (data.errors) {
            const modalStateErrors = [];
            for (const key in data.errors) {
                if (data.errors[key]) {
                    modalStateErrors.push(data.errors[key])
                }
            }
            throw modalStateErrors.flat();
        }
        break;
    case 401:
        toast.error('unauthorised');
        break;
    case 404:
        history.push('/not-found')
        break; 
    case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error');
        break;           
}
return Promise.reject(error);
});


const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody), 
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody), 
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody), 
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody), 
}

const Rides = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Ride[]>>('/rides', { params })
        .then(responseBody),
    details: (id: string) => request.get<Ride>(`rides/${id}`),
    create: (ride: Ride) => request.post<void>('/rides', ride), 
    update: (ride: Ride) => request.put<void>(`/rides/${ride.id}`, ride),
    delete: (id: string) => request.del<void>(`rides/${id}`)
}

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>('/account/login', user),
    register: (user: UserFormValues) => request.post<User>('/account/register', user)
}

const GoogleMaps = {
    apiKey: () => request.get<string>('/googleMaps')
}

const agent = {
    Rides,
    Account,
    GoogleMaps
}

export default agent;