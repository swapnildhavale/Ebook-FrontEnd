import http from './httpService';
import config from '../config.json';
import jwtDecode from 'jwt-decode';

const key='token';

http.setJwt(getJwt());

export async function loginUser(user){
    const {data:jwt}=await http.post(config.apiEndPoint+'/auth',user);
    localStorage.setItem(key,jwt);
}

export function loginWithJwt(jwt){
    localStorage.setItem(key,jwt);   
}

export function logout(){
    localStorage.removeItem(key);
}

export function getJwt(){
    return localStorage.getItem(key);
}

export function getCurrentUser(){
    try{
        const token=localStorage.getItem(key);
        return jwtDecode(token);
      }
      catch(ex){
          return null;
      }
      
}