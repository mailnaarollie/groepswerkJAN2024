<script setup>
import { useCardsStore } from '@/stores/CardElement.js';

const store2 = useCardsStore();
const { cards2 } = store2;

const addCard2 = () => {
  store2.addCard();
};

const addTodoItem = (card) => {
  if (card.newTodo.trim()) {
    store2.addTodo(card.id, card.newTodo.trim());
    store2.updateNewTodo(card.id, '');
  }
};

const deleteTodoItem = (cardId, todoId) => {
  store2.deleteTodo(cardId, todoId);
};

const toggleCompleted = (cardId, todoId) => {
  store2.toggleCompleted(cardId, todoId);
};


const editTitle = (card) => {
  card.editingTitle = true;
};

const saveTitle = (card) => {
  card.editingTitle = false;
  // Save the updated title in your store or wherever you are storing the data
  if (card.title.trim() === "") {
    // Handle the case where the title is empty if needed
  }
};



</script>

<template>
        <div class="card">
          <div class="card-body bg-body-tertiary shadow rounded-2">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 v-if="!card.editingTitle" @click="editTitle(card)" class="clickable-title">
                {{ card.title ? card.title : 'Add Title' }}
              </h4>
              <input style="border: 1px solid #ccc; border-radius: 5px;padding: 5px; margin: 0; width: 100%; box-sizing: border-box;" v-show="card.editingTitle" v-model="card.title" @blur="saveTitle(card)" @keyup.enter="saveTitle(card)" />
            </div>
            <div class="todo-list">
              <ul class="list-group mt-2">
                <li class="list-group-item" v-for="todo in card.todos" :key="todo.id" :class="{ 'list-group-item-success': todo.completed }">
                  {{ todo.item }}
                  <span class="actions float-end">
                    <button class="btn btn-sm" @click="toggleCompleted(card.id, todo.id)">&#10004;</button>
                    <button class="btn btn-sm text-danger" @click="deleteTodoItem(card.id, todo.id)">&#10060;</button>
                  </span>
                </li>
              </ul>
              <form @submit.prevent="addTodoItem(card)">
                <div class="d-flex align-items-center">
                  <input class="form-control text-center my-auto" v-model="card.newTodo" type="text"
                         placeholder="nieuwe taak"/>
                  <button class="btn btn-success mt-2 ms-2" type="submit">+</button>
                </div>
              </form>
            </div>
          </div>
        </div>
</template>


<style scoped>
.completed {
  text-decoration: line-through;
}
.clickable-title {
  cursor: pointer;
  user-select: none;
}
</style>
```