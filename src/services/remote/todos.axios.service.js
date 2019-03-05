import {AxiosService} from "./base/axios.service";
import {NotificationService} from "../local/notification.service";

function getPromiseFromHttpRequest(promise, message = 'Unknown message', takeMessageFromResponse = true) {
    return new Promise((resolve, reject) => {
        promise.then(res => {
            if (takeMessageFromResponse && res.data.full_messages && res.data.full_messages.length > 0)
                NotificationService.showSuccessAlert(res.data.full_messages[0]);
            else
                NotificationService.showSuccessAlert(message);
            resolve(res);
        }).catch(err => {
            NotificationService.showToastError(err.message);
            debugger
            reject(err);
        })
    });
}


export const TodoAxiosService = {
    fetchAll(query = {page: 1, page_size: 5}) {
        if (query.completed)
            return getPromiseFromHttpRequest(AxiosService.fetchPage('todos/pending', query), 'Completed To dos loaded successfully');
        else if (query.completed === false)
            return getPromiseFromHttpRequest(AxiosService.fetchPage('todos/completed', query), 'Pending todos completed');
        else
            return getPromiseFromHttpRequest(AxiosService.fetchPage('todos', query), 'Todos loaded successfully');

    },
    fetchById(id) {
        /*
        return new Promise((resolve, reject) => {
            AxiosService.get(`/todos/${id}`).then(res => {
                NotificationService.showSuccessAlert('Todo fetched successfully');
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
        */

        return getPromiseFromHttpRequest(AxiosService.get(`/todos/${id}`), 'Todo fetched successfully');
    },
    create(todo) {
        return getPromiseFromHttpRequest(AxiosService.post('/todos', todo), 'Todo created successfully');
    },
    update(todo) {
        return getPromiseFromHttpRequest(AxiosService.put(`/todos/${todo.id}`, todo), 'Todo Updated Successfully');
    },
    delete(todo) {
        return getPromiseFromHttpRequest(AxiosService.delete(`/todos/${todo.id}`), 'Todo deleted successfully deleted');
    },


};
