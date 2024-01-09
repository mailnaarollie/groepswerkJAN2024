<script setup>
import { ref, nextTick } from 'vue';
import CardElement from "@/components/CardElement.vue";
import BoardElement from "@/components/BoardElement.vue";

const backgroundColor = ref('');


const yourTitleVariable = ref("Board"); // Initialize with your default title
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
  <nav class="navbar bg-dark">
    <div class="container">
      <h2 class="text-dark">TRELLOW</h2>
      <div class="color-selector ">
        <label class="color-box lightgreen" :class="{checked: backgroundColor === 'lightgreen'}">
          <input type="radio" value="lightgreen" v-model="backgroundColor" />
        </label>
        <label class="color-box lightblue" :class="{checked: backgroundColor === 'lightblue'}">
          <input type="radio" value="lightblue" v-model="backgroundColor" />
        </label>
        <label class="color-box pink" :class="{checked: backgroundColor === 'pink'}">
          <input type="radio" value="pink" v-model="backgroundColor" />
        </label>
        <label class="color-box lightgray" :class="{checked: backgroundColor === 'lightgray'}">
          <input type="radio" value="lightgray" v-model="backgroundColor" />
        </label>
        <label class="color-box lightyellow" :class="{checked: backgroundColor === 'lightyellow'}">
          <input type="radio" value="lightyellow" v-model="backgroundColor" />
        </label>
      </div>

    </div>
  </nav>
  <div class="row me-0 bg-secondary-subtle ">
    <div :style="{ backgroundColor:  sidebarColorTint }"
         class="col-lg-3 col-xl-3 vh-100 bg-secondary-subtle shadow text-white">
      <div class="row bg-secondary  pb-3">
        <div class="col text-center mt-4 mx-5">
          <h4>MENU</h4>
        </div>
      </div>
      <div class="row mx-5">
        <div class="col mt-4">
          <div class="row mx-2">
            <div class="list-group pe-0">
              <a href="betaal.html"
                 class="list-group-item rounded list-group-item-action bg-tertiary border-success"
                 aria-current="true">
                + Add new board<span class="kleineLeters text-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg> PREMIUM</span>
              </a>
              <a href="betaal.html"
                 class="list-group-item rounded list-group-item-action my-2 bg-tertiary border-success">+
                Add a member <span class="kleineLeters text-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg> PREMIUM</span></a>
            </div>
          </div>
        </div>
      </div>

      <div class="row ">
        <div class="col mt-4">
          <div class="row ">
            <div class="list-group pe-0">
              <board-element/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :style="{ backgroundColor: backgroundColor }" class="col-lg-9 col-xl-9 vh-100 background-area">
      <div class="row py-4 mx-5">
        <h2
          v-if="!isEditingTitle"
          @click="editTitle"
          class="bg-white rounded text-center border-3 border-black text-uppercase py-3 px-4 mb-3 clickable-title"
        >
          {{ yourTitleVariable }}
        </h2>

        <input
          v-show="isEditingTitle"
          class="form-control text-center my-auto editable-title mb-2"
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

.kleineLeters{
  font-size: 13px;
  margin-left: 50px;
  color: grey;
  opacity: 50%;
}



.color-box {
  width: 25px;
  height: 25px;
  display: inline-block;
  border: 1px solid #000;
  cursor: pointer;
}

.color-box input[type="radio"] {
  display: none;
}


.color-box.lightgreen { background-color: lightgreen; }
.color-box.lightblue { background-color: lightblue; }
.color-box.pink { background-color: pink; }
.color-box.lightgray { background-color: lightgray;}
.color-box.lightyellow { background-color: lightyellow; }

.color-box.checked {
  border: 2px solid #000;
}

.background-area {
  transition: background-color 0.5s ease; /* Zachte overgang van achtergrondkleur */
  background-size: 100vh; /* Zorgt ervoor dat de achtergrond altijd de volledige hoogte van het scherm inneemt */
}


</style>
