<script setup>
import { useCardsStore } from '@/stores/CardElement.js';

const store = useCardsStore();
const { cards } = store;

const addCard = () => {
  store.addCard();
};

const addTodoItem = (card) => {
  if (card.newTodo.trim()) {
    store.addTodo(card.id, card.newTodo.trim());
    store.updateNewTodo(card.id, '');
  }
};

const deleteTodoItem = (cardId, todoId) => {
  store.deleteTodo(cardId, todoId);
};

const toggleCompleted = (cardId, todoId) => {
  store.toggleCompleted(cardId, todoId);
};
</script>

<template>
  <div class="container">
    <button @click="addCard" class="btn btn-primary mb-3">+ voeg een nieuwe taak toe</button>
    <div class="row">
      <div class="col-md-3 mb-3" v-for="card in cards" :key="card.id">
        <div class="card">
          <div class="card-body bg-body-tertiary shadow rounded-2">
            <div class="todo-list">
              <form @submit.prevent="addTodoItem(card)">
                <div class="d-flex align-items-center">
                  <input class="form-control text-center my-auto" v-model="card.newTodo" type="text"
                          placeholder="voeg taak toe"/>
                  <button class="btn btn-success mt-2" type="submit">+</button>
                </div>
              </form>
              <ul class="list-group mt-2">
                <li class="list-group-item" v-for="todo in card.todos" :key="todo.id" :class="{ 'list-group-item-success': todo.completed }">
                  {{ todo.item }}
                  <span class="actions float-end">
                    <button class="btn btn-sm" @click="toggleCompleted(card.id, todo.id)">&#10004;</button>
                    <button class="btn btn-sm text-danger" @click="deleteTodoItem(card.id, todo.id)">&#10060;</button>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
```