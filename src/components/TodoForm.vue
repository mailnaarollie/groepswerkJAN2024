<script setup>
import { ref } from "vue";
import { useTodoListStore } from "@/stores/todoList.js";

const todo = ref('');
const store = useTodoListStore();

function addItemAndClear() {
  if (todo.value.length === 0) {
    return;
  }
  store.addTodo(todo.value);
  todo.value = '';
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="addItemAndClear" class="input-group">
          <input class="form-control" v-model="todo" type="text" placeholder="Fill out item here">
          <button class="btn btn-primary" type="submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
