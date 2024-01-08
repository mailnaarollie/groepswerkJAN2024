<script setup>
import { useCardsStore } from '@/stores/CardElement.js';
import CardComponent from '@/components/CardComponent.vue'

const store = useCardsStore();

const addCard = () => {
  store.addCard();
};



</script>

<template>
  <div class="container">
    <button @click="addCard" class="btn btn-primary mb-3">+ add list</button>
    <div class="row">

        <card-component/>

    </div>
  </div>
</template>


<style scoped>


</style>
```