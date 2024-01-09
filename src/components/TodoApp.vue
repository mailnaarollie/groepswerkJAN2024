<script setup>
import { ref, nextTick } from 'vue';
import CardElement from "@/components/CardElement.vue";

const yourTitleVariable = ref("Add a title"); // Initialize with your default title
const isEditingTitle = ref(false);

const editTitle = () => {
  isEditingTitle.value = true;

  // Use nextTick to wait for the DOM to update before focusing the h2 element
  nextTick(() => {
    const titleElement = document.querySelector('.editable-title'); // Adjust the class accordingly
    if (titleElement) {
      titleElement.focus();
    }
  });
};

const saveTitle = () => {
  isEditingTitle.value = false;
  // Add logic to save the updated title if needed
};
</script>

<template>
  <div class="row">
    <div class="col-lg-3 col-xl-3 vh-100 bg-body-secondary">
      <div class="row m-0">
        <div class="col text-center mt-4">
          <h2 class="bg-white rounded shadow mx-3 py-3">MENU</h2>
        </div>
      </div>
      <div class="row m-0">
        <div class="col mt-4">
          <div class="row m-0">
            <div class="list-group pe-0">
              <a href="#" class="list-group-item rounded list-group-item-action" aria-current="true">
                + Add new board
              </a>
              <a href="#" class="list-group-item rounded list-group-item-action my-2">+ Add a member</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-0">
        <div class="col text-center mt-4">
          <h2 class="bg-white rounded shadow mx-3 py-3">BOARDS</h2>
        </div>
      </div>
      <div class="row m-0">
        <div class="col mt-4">
          <div class="row m-0">
            <div class="list-group pe-0">
              <board-element/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-9 col-xl-9 bg-body-tertiary vh-100">
      <div class="row m-0 py-4">
        <h2
          v-if="!isEditingTitle"
          @click="editTitle"
          class="bg-white rounded shadow mx-3 py-3 px-4 mb-3 clickable-title"
        >
          {{ yourTitleVariable }}
        </h2>

        <input
          v-show="isEditingTitle"
          class="form-control text-center my-auto editable-title"
          v-model="yourTitleVariable"
          @blur="saveTitle"
          @keyup.enter="saveTitle"
        />

        <card-element/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
