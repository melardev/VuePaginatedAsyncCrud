<template>
    <div v-if="todo.id" class="container">
        <div>
            {{todo.title}}
            <br/>
            Description:
            {{todo.description}}
        </div>
        <div>
        </div>

        <label>Completed
            <input type="checkbox" :checked="todo.completed" disabled/>
        </label>

        <hr/>

        <div class="btn-group btn-group-sm">
            <router-link to="/" type="button" class="btn btn-success">Back</router-link>
            &nbsp;
            <router-link class="btn btn-warning" :to="`/todos/${todo.id}/edit`">Edit</router-link>
            &nbsp;
        </div>
    </div>
</template>

<script>
    import {TodoAxiosService} from "../../services/remote/todos.axios.service";

    export default {
        name: "TodoDetails",
        data() {
            return {
                todo: {}
            }
        },
        mounted() {
            TodoAxiosService.fetchById(this.$router.currentRoute.params.id).then(res => {
                if (res.data && res.data.success) {
                    delete res.data.success;
                    delete res.data.full_messages;
                    this.todo = res.data;
                }
            }).catch(err => {
                debugger;
            })

        }
    }
</script>

<style scoped>

</style>
