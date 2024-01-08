// stores/cards.js
import { defineStore } from 'pinia';

export const useCardsStore = defineStore('cards', {
    state: () => ({
        cards: []
    }),
    actions: {
        addCard() {
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


    }
});
