<!-- components/TodoList.vue -->
<template>
  <div class="todo-list">
    <form @submit.prevent="addTodoItem">
      <input v-model="newTodo" type="text" placeholder="Voeg een nieuwe taak toe" />
      <button type="submit">Toevoegen</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
        {{ todo.item }}
        <span class="actions">
          <button @click="toggleCompleted(todo.id)">&#10004;</button>
          <button @click="deleteTodoItem(todo.id)">&#10060;</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoListStore } from '@/stores/todoList';

const store = useTodoListStore();
const newTodo = ref('');

const addTodoItem = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value.trim());
    newTodo.value = '';
  }
};

const deleteTodoItem = (id) => {
  store.deleteTodo(id);
};

const toggleCompleted = (id) => {
  store.toggleCompleted(id);
};

const todos = store.todoList;
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}

.actions button {
  margin-left: 10px;
  cursor: pointer;
}
</style>
