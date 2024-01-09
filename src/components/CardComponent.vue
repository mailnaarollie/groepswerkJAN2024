<script setup>
import {useCardsStore} from '@/stores/CardElement.js';
import draggable from 'vuedraggable';


const store = useCardsStore();


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


let draggedTask = null;
let fromListId = null;

const onDragStart = (task, listId) => {
  draggedTask = task;
  fromListId = listId;
};

const onDrop = (toListId) => {
  if (draggedTask && fromListId !== toListId) {
    store.moveTask(fromListId, toListId, draggedTask);
    draggedTask = null;
    fromListId = null;
  }
};

</script>

<template>
  <div class="container">
    <draggable v-model="store.cards" group="lists" :item-key="card => card.id" @start="onDragStart" @end="onDrop"
               class="d-flex flex-wrap">
      <template #item="{ element, index }">
        <div :key="index" class="col-md-3 m-3 card-container">
          <div class="card">
            <div class="card-body bg-body-tertiary shadow rounded-2">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <!-- Title and Edit Icon -->
                <h4 v-if="!element.editingTitle" @click="editTitle(element)" class="clickable-title">
                  {{ element.title ? element.title : 'Add Title' }}
                </h4>
                <input v-show="element.editingTitle" v-model="element.title" @blur="saveTitle(element)"
                       @keyup.enter="saveTitle(element)" class="input-style" />
                <i class="bi bi-pencil-square text-black bg-white"></i>

                <!-- Verwijder Icoon -->
                <button @click="deleteCard(element.id)" class="text-danger border-0 bg-transparent">
                  <i class="bi bi-x-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg></i>
                </button>

              </div>
              <div class="todo-list">
                <ul class="list-group mt-2 ">
                  <li class="list-group-item" v-for="todo in element.todos" :key="todo.id"
                      :class="{ 'list-group-item-success': todo.completed }">
                    {{ todo.item }}
                    <div class="actions float-end">
                      <!-- Dropdown Trigger -->
                      <button @click="toggleDropdown(todo)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                 class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path
                          d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                      </svg></button>
                      <!-- Dropdown Menu -->
                      <div v-if="todo.showDropdown" class="dropdown-menu">
                        <a @click="setTodoBackground(todo.id, 'green')">Afgewerkt</a>
                        <a @click="setTodoBackground(todo.id, 'yellow')">Low</a>
                        <a @click="setTodoBackground(todo.id, 'orange')">Medium</a>
                        <a @click="setTodoBackground(todo.id, 'red')">High</a>
                        <a @click="deleteTodoItem(element.id, todo.id)">Verwijderen</a>
                      </div>
                    </div>
                  </li>


                </ul>
                <form @submit.prevent="addTodoItem(element)">
                  <div class="d-flex align-items-center">
                    <input class="form-control text-center my-auto" v-model="element.newTodo" type="text"
                           placeholder="new task"/>
                    <button class="btn btn-success mt-2 ms-2" type="submit">+</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
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
.custom-dropdown ul.show{
  display: block;
}

.custom-dropdown ul.show {
  display: block;
}
</style>
```