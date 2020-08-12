import http from './httpService';
import config from '../config.json';

export function getBooks(){
    return http.get(config.apiEndPoint+'/books');
    ///return http.get(`${config.apiEndPoint}/books`);
}

export function getBook(bookId){
    return http.get(config.apiEndPoint+'/books/'+bookId);
}

export function saveBook(book){
    return http.post(config.apiEndPoint+'/books',book);
}

export function deleteBook(bookId){
    return http.delete(config.apiEndPoint+'/books/'+bookId);
}

export function updateBook(book){
    return http.put(config.apiEndPoint+'/books/'+book._id,book);
}