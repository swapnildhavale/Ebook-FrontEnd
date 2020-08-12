import http from './httpService';
import config from '../config.json';


export function registerUser(user){
    return http.post(config.apiEndPoint+'/users',user);
}