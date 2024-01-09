<script setup>
import { useBoardsStore } from '@/stores/boards.js';

const store = useBoardsStore();
const { boards } = store;


</script>

<template>
  <div class="container">
    <div class="col-md-3 mb-3" v-for="board in boards" :key="board.id">
      <div>
        <a href="#" class="list-group-item rounded list-group-item-action my-2">{{board.item}}</a>

      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
```