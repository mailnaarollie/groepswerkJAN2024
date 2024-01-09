<script setup>
import {useCardsStore} from '@/stores/CardElement.js'
import draggable from 'vuedraggable'
import {nextTick} from 'vue'

const store = useCardsStore()
const addTodoItem = (card) => {
  if (card.newTodo.trim()) {
    store.addTodo(card.id, card.newTodo.trim())
  }
}
const deleteTodoItem = (cardId, todoId) => {
  store.deleteTodo(cardId, todoId)
}

const toggleCompleted = (cardId, todoId) => {
  store.toggleCompleted(cardId, todoId)
}
const deleteCard = (cardId) => {
  // Use the store to delete the card
  store.deleteCard(cardId)
}
const editTitle = (card) => {
  card.editingTitle = true;

  // Use $nextTick to wait for the DOM to update before focusing
  // the input element
  nextTick(() => {
    const inputElement = document.querySelector(`.title-input-${card.id}`);
    if (inputElement) {
      inputElement.focus();
    }
  });
};
const saveTitle = (card) => {
  card.editingTitle = false
  // Save the updated title in your store or wherever you are storing the data
  if (card.title.trim() === '') {
    // Handle the case where the title is empty if needed
  }
}

//drag and drop functionalities
let draggedTask = null
let fromListId = null

const onDragStart = (task, listId) => {
  draggedTask = task
  fromListId = listId
}

const onDrop = (toListId) => {
  if (draggedTask && fromListId !== toListId) {
    draggedTask = null
    fromListId = null
  }
}
</script>

<template>
  <div class="container">
    <div class="custom-wrapper" >
      <draggable v-model="store.cards" group="lists" :item-key="card => card.id" @start="onDragStart" @end="onDrop"
                 class="d-flex flex-nowrap overflow-auto">
        <template #item="{ element, index }">
          <div :key="index" style="height: 700px" class=" m-3  card-container">
            <div class="card" style="width: 300px">
              <div class="card-body bg-body-tertiary shadow rounded-2">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4
                      ref="titleInput"
                      v-if="!element.editingTitle"
                      @click="editTitle(element)"
                      class="clickable-title"
                      contenteditable="true"
                  >
                    {{ element.title ? element.title : 'Add Title' }}
                  </h4>

                  <input
                      :class="'form-control text-center my-auto title-input-' + element.id"
                      v-show="element.editingTitle"
                      v-model="element.title"
                      @blur="saveTitle(element)"
                      @keyup.enter="saveTitle(element)"
                  />

                  <!-- Delete Card-->
                  <button @click="deleteCard(element.id)"  style="background: none; border: none; outline: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg>
                  </button>

                </div>
                <div class="todo-list">
                  <ul class="list-group mt-2">

                    <draggable v-model="element.todos" :group="'todos-'" @end="onDrop">
                      <template v-slot:item="{ element: todo }">
                        <li class="list-group-item" :class="{ 'list-group-item-success': todo.completed }">
                          {{ todo.item }}
                          <span class="actions float-end">
                          <button class="btn btn-sm" @click="toggleCompleted(element.id, todo.id)">&#10004;</button>
                          <button class="btn btn-sm text-danger"
                                  @click="deleteTodoItem(element.id, todo.id)">&#10060;</button>
                        </span>
                        </li>
                      </template>
                    </draggable>

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
  </div>
</template>

<style scoped>

.clickable-title {
  cursor: pointer;
  user-select: none;
}

.custom-wrapper {
  display: flex;
  overflow-x: auto;
  margin: -10px; /* Adjust margin as needed */
}

</style>
```