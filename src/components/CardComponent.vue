<script setup>
import { useCardsStore } from '@/stores/CardElement.js';
import draggable from 'vuedraggable';
// Remove ref if not used



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
let draggedCard = null;
let fromIndex = null;
const onDragStart = (card, index) => {
  draggedCard = card;
  fromIndex = index;
};

const onDrop = (toIndex) => {
  if (draggedCard !== null && fromIndex !== null && fromIndex !== toIndex) {
    // Remove the dragged card from its original position
    const [removedCard] = store.cards.splice(fromIndex, 1);
    // Insert the removed card at the new position
    store.cards.splice(toIndex, 0, removedCard);

    // Reset the dragged card and index
    draggedCard = null;
    fromIndex = null;

    // Update the store or state as necessary
    store.updateCards(store.cards);
  }
};


const dragOptions = {
  group: 'cards',

};


</script>

<template>
  <draggable v-model="cards" :options="dragOptions" @start="onDragStart" @end="onDrop">
    <template v-slot:item="{ element, index }">
      <div class="col-md-3 mb-3">
      <div class="card">
        <div class="card-body shadow rounded-2" @dragstart="onDragStart(index)">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 v-if="!element.editingTitle" @click="editTitle(element)" class="clickable-title">
                {{ element.title ? element.title : 'Add Title' }}
              </h4>
              <input style="border: 1px solid #ccc; border-radius: 5px; padding: 5px; margin: 0; width: 100%; box-sizing: border-box;"
                     v-show="element.editingTitle" v-model="element.title" @blur="saveTitle(element)" @keyup.enter="saveTitle(element)" />
              <i class="bi bi-pencil-square text-black bg-white"></i>

              <!-- Custom Dropdown -->
              <div class="custom-dropdown bg-white" @click="toggleDropdown(element)">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                    <path
                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                  </svg>
                </button>
                <ul :class="{ 'show': element.showDropdown }">
                  <li>link</li>
                  <li>link</li>
                </ul>
              </div>
              <!-- End Custom Dropdown -->
              <button @click="deleteCard(element.id)" class="text-danger border-0 bg-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg></button>

            </div>
            <div class="todo-list">
              <ul class="list-group mt-2">

                <li class="list-group-item" v-for="todo in element.todos" :key="todo.id" :class="{ 'list-group-item-success': todo.completed }">
                  {{ todo.item }}
                  <span class="actions float-end">
                  <button class="btn btn-sm" @click="toggleCompleted(element.id, todo.id)"><svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-check-lg text-success" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></button>
                  <button class="btn btn-sm text-danger" @click="deleteTodoItem(element.id, todo.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></button>
                </span>
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
  border:  none;
  padding: 5px 10px;
  background-color: white;
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
  z-index: 900;

}
</style>
```