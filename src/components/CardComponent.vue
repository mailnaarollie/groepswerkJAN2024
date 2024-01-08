<script setup>
import { useCardsStore } from '@/stores/CardElement.js';
import draggable from 'vuedraggable';


const store = useCardsStore();
const { cards } = store;

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


const editTitle = (card) => {
  card.editingTitle = true;
};
const deleteCard = (cardId) => {
  // Use the store to delete the card
  store.deleteCard(cardId);
};


const saveTitle = (card) => {
  card.editingTitle = false;
  // Save the updated title in your store or wherever you are storing the data
  if (card.title.trim() === "") {
    // Handle the case where the title is empty if needed
  }
};
const toggleDropdown = (card) => {
  card.showDropdown = !card.showDropdown;
};


</script>


<template>
  <div class="col-md-3 mb-3" v-for="card in cards" :key="card.id">

  <div class="card">
    <div class="card-body bg-body-tertiary shadow rounded-2">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 v-if="!card.editingTitle" @click="editTitle(card)" class="clickable-title">
          {{ card.title ? card.title : 'Add Title' }}
        </h4>
        <input style="border: 1px solid #ccc; border-radius: 5px; padding: 5px; margin: 0; width: 100%; box-sizing: border-box;" v-show="card.editingTitle" v-model="card.title" @blur="saveTitle(card)" @keyup.enter="saveTitle(card)" />
        <i class="bi bi-pencil-square text-black bg-white"></i>

        <!-- Custom Dropdown -->
        <div class="custom-dropdown" @click="toggleDropdown(card)">
          <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
          </svg></button>
          <ul :class="{ 'show': card.showDropdown }">
            <li @click="deleteCard(card.id)" class="text-danger">Delete</li>
          </ul>
        </div>
        <!-- End Custom Dropdown -->

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
                   placeholder="new task"/>
            <button class="btn btn-success mt-2 ms-2" type="submit">+</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>


<style scoped>

.clickable-title {
  cursor: pointer;
  user-select: none;
}


.custom-dropdown {
  position: relative;
}

.custom-dropdown button {
  cursor: pointer;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  padding: 5px 10px;
}

.custom-dropdown ul {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ced4da;
  list-style: none;
  padding: 0;
  margin: 0;
  display: none;
}

.custom-dropdown ul li {
  padding-right: 50px;
  padding-left: 5px;
  padding-bottom: 3px;
  cursor: pointer;
}

.custom-dropdown ul li:hover {
  background-color: #f8f9fa;
}

.custom-dropdown ul.show {
  display: block;
}
</style>
```