// stores/cards.js
import { defineStore } from 'pinia';

export const useBoardsStore = defineStore('boards', {
    state: () => ({
        boards: []
    }),
    actions: {
        addCard() {
            const newBoard = {
                id: this.boards.length + 1,
                titles: [],
                nextTitleId: 1,
                newTitle: ''
            };
            this.boards.push(newBoard);
        },
        updateNewTodo(boardId, newBoardValue) {
            const board = this.boards.find(board => board.id === boardId);
            if (board) {
                board.newTitle = newBoardValue;
            }
        },
        addTodo(boardId, item) {
            const board = this.boards.find(board => board.id === boardId);
            if (board) {
                board.boards.push({
                    id: board.nextTitleId++,
                    item: item,
                    completed: false
                });
            }
        },
        deleteTodo(boardId, titleId) {
            const board = this.boards.find(board => board.id === boardId);
            if (board) {
                board.titles = board.titles.filter(title => title.id !== titleId);
            }
        },
    }
});
