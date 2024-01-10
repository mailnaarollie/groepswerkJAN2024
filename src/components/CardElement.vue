<script setup>
import { useCardsStore } from '@/stores/CardElement.js';
import CardComponent from "@/components/CardComponent.vue";

const store = useCardsStore();
const addCardToComponent = () => {
  console.log('Adding card to component');
  store.addCard();
};
</script>

<template>
  <div class="container">
    <button @click="addCardToComponent" class="btn btn-dark mb-3">+ </button>
    <div class="row">
      <card-component/>
    </div>
  </div>
</template>

<style scoped>

</style>
