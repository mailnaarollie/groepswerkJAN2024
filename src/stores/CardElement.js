// stores/cards.js
import { defineStore } from 'pinia';
import {ref} from "vue";


export const useCardsStore = defineStore('cards', {
    state: () => ({
        cards: ref([]),

    }),
    actions: {
        addCard() {
            console.log('Adding card:', this.cards);

            // Ensure that this.cards is initialized as an array
            this.cards = this.cards || [];

            const newCard = {
                id: this.cards.length + 1,
                todos: [],
                nextTodoId: 1,
                newTodo: ''
            };

            this.cards.push(newCard);
        },
        updateNewTodo(cardId, newTodoValue) {
            const card = this.cards.find(card => card.id === cardId);
            if (card) {
                card.newTodo = newTodoValue;
            }
        },
        addTodo(cardId, item) {
            const card = this.cards.find(card => card.id === cardId);
            if (card) {
                card.todos.push({
                    id: card.nextTodoId++,
                    item: item,
                    completed: false
                });
            }
        },
        deleteTodo(cardId, todoId) {
            const card = this.cards.find(card => card.id === cardId);
            if (card) {
                card.todos = card.todos.filter(todo => todo.id !== todoId);
            }
        },
        deleteCard(cardId) {
            // Find the index of the card with the given cardId
            const cardIndex = this.cards.findIndex(card => card.id === cardId);

            // If the card is found, remove it from the array
            if (cardIndex !== -1) {
                this.cards.splice(cardIndex, 1);
            }
        },
        toggleCompleted(cardId, todoId) {
            const card = this.cards.find(card => card.id === cardId);
            if (card) {
                const todo = card.todos.find(todo => todo.id === todoId);
                if (todo) {
                    todo.completed = !todo.completed;
                }
            }
        },
        moveTask(fromListId, toListId, task) {

            const fromList = this.cards.find(card => card.id === fromListId);
            const toList = this.cards.find(card => card.id === toListId);

            if (fromList && toList) {
                // Assuming task is an object with an id property
                const movedTask = fromList.todos.find(todo => todo.id === task.id);
                if (movedTask) {
                    fromList.todos = fromList.todos.filter(todo => todo.id !== task.id);
                    toList.todos.push(movedTask);
                }
            }
        },
    }
});
