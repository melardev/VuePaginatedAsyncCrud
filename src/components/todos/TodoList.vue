<template>
    <div class="container">
        <h1>Todos</h1>
        <div>
            <router-link class="btn btn-success" to="/todos/new">Add new</router-link>
        </div>

        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Completed</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(todo,index) in todos" :to="'/todos/' + todo.id"
                :key="todo.id" :index="index">
                <td>
                    {{todo.title}}
                </td>
                <td>
                    <label>Completed
                        <input type='checkbox' @click='toggleComplete(todo)' :checked="todo.completed"/>
                    </label>
                </td>
                <td>
                    {{todo.created_at}}
                </td>
                <td>
                    {{todo.updated_at}}
                </td>
                <td>
                    <!-- <span (click)='getDetails(todo)' class='btn btn-info'>Details</span> -->
                    <router-link :to="`/todos/${todo.id}`" class="btn btn-primary active" role="button"
                                 routerLinkActive="active">Details
                    </router-link>
                </td>
                <td>
                    <router-link :to="`/todos/${todo.id}/edit`" class='btn btn-warning'>Edit</router-link>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" @click='deleteTodo(todo)'>Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
        <app-pagination :page-meta="this.pageMeta" v-on:fetch-more="fetchMore"></app-pagination>
    </div>

</template>

<script>
    import {TodoAxiosService} from "../../services/remote/todos.axios.service";
    import Pagination from "../shared/Pagination";

    export default {
        name: "TodoList",
        components: {
            appPagination: Pagination
        },
        data() {
            return {
                todos: [],
                pageMeta: {}
            }
        },
        mounted() {
            this.loadTodos();
        },
        methods: {
            toggleComplete(todo) {
                TodoAxiosService.update({...todo, completed: !todo.completed}).then(res => {
                    if (res.data.success) {
                        this.todos = this.todos.map(todo => todo.id === res.id ? res : todo);
                    }
                }).catch(err => {
                    debugger
                });
            },
            deleteTodo(todo) {
                TodoAxiosService.delete(todo).then(res => {
                    if (res.data && res.data.success) {
                        this.todos = this.todos.filter(t => t.id !== todo.id);
                    }
                }).catch(err => {
                    debugger
                })
            },
            fetchMore(query) {
                this.loadTodos(query)
            },

            loadTodos(query = {page: 1, page_size: 5}) {
                return TodoAxiosService.fetchAll(query).then(response => {
                    if (response.data.success) {
                        this.pageMeta = response.data.page_meta;
                        this.todos = response.data.todos;
                    }
                }).catch(err => {
                    debugger
                });
            }
        }
    }
</script>

<style scoped>

</style>
