<template>
    <div class="container" style="width: 300px;">
        <h3>{{todo.id ? 'Update' : 'Create'}} Todo</h3>
        <form v-on:submit.prevent>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" required name="title"
                       v-model="todo.title"/>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text" class="form-control" id="description" required
                          v-model="todo.description"
                          name="description"></textarea>
            </div>

            <div class="form-group">
                <label for="completed">Completed</label>&nbsp;
                <input type="checkbox" id="completed" required v-model="todo.completed"
                       name="completed">
            </div>

            <div class="row">
                <button class="btn btn-success" @click="createOrUpdateTodo()" :disabled="isSubmitting">
                    {{todo.id ? 'Update' : 'Create'}}
                </button>
                &nbsp;
                <button v-if="todo.id" class="btn btn-danger" @click="createOrUpdateTodo()" :disabled="isSubmitting">
                    Delete
                </button>
                &nbsp;
                <button class="btn btn-warning" @click="goHome()" :disabled="isSubmitting">
                    Back Home
                </button>
            </div>
        </form>
    </div>

</template>

<script>
    import {TodoAxiosService} from "../../services/remote/todos.axios.service";

    export default {
        name: "TodoCreateOrEdit",
        data() {
            return {
                todo: {},
                isSubmitting: false,
                submitted: false,
            }
        },
        mounted() {
            const id = this.$router.currentRoute.params.id;
            if (id) {
                // Edit mode
                TodoAxiosService.fetchById(id).then(res => {
                    if (res.data && res.data.success) {
                        delete res.data.success;
                        delete res.data.full_messages;
                        this.todo = res.data;
                    }
                }).catch(err => {
                    debugger
                });
            }
        },
        methods: {
            createOrUpdateTodo() {
                if (this.$router.currentRoute.params.id) {
                    // edit mode
                    this.isSubmitting = true;

                    TodoAxiosService.update(this.todo).then(res => {
                        this.isSubmitting = false;
                        if (res.data && res.data.success)
                            this.$router.push('/');
                    }).catch(err => {
                        debugger
                        this.isSubmitting = false;
                    });
                } else {
                    this.isSubmitting = true;
                    TodoAxiosService.create(this.todo).then(res => {
                        this.isSubmitting = false;
                        this.$router.push('/');
                    }).catch(err => {
                        debugger
                        this.isSubmitting = false;
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
