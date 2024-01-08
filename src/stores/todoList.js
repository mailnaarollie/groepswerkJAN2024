import { defineStore } from "pinia";


export const useTodoListStore = defineStore('todoList', {
    state: () => ({
        todoList: [],
        id: 0 //state wordt telkens met 1 verhoogd
    }),
    actions: {
        addTodo (item) {
            this.todoList.push({item:item, id:this.id++, completed:false})

        },
        deleteTodo(itemId){
            this.todoList=this.todoList.filter((object) =>{
                return object.id !==itemId;
            })

        },
        toggleCompleted(idToFind) {
            const todo = this.todoList.find((obj) => obj.id === idToFind)
            if (todo) {
                todo.completed = !todo.completed
            }

        }
    }
})
