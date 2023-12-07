<template>
  <div class="component-layout">
    <div class="info-tags">
      <h2 style="margin-top: 1vh; margin-bottom: 3vh">
        Добавьте важную информацию
      </h2>
      <div class="switch-container">
        <div class="form-check form-switch" v-for="item of items">
          <input
                  @change="changeTag(item, $event)"
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault">{{item.name}}</label>
        </div>
      </div>
        <div class="time-selector">
          <h1>Время работы</h1>
          <div class="from">
            <div class="cs-form">
              <label>С</label>
              <input type="time" class="form-control" value="10:05 AM" />
            </div>
          </div>
          <div class="to">
            <div class="cs-form">
              <label>До</label>
              <input type="time" class="form-control" value="10:05 AM" />
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {onMounted, Ref, ref, UnwrapRef} from "vue";
import TagService from "@/services/TagService";
import type Tag from "@/entities/Tag";
import {useCreateItemStore} from "@/stores/createItemStore";

const store = useCreateItemStore();
const items: Ref<UnwrapRef<Tag[]>> = ref([]);

onMounted(() => {
    TagService.getTags().then(data => {
        items.value = data;
    });
})

const changeTag = (tag: Tag, event) => {
    if (event.srcElement.checked) {
        store.tags.push(tag)
    }
    else {
        store.tags = store.tags.filter(((t) => t != tag))
    }
    console.log(store.tags)
}

</script>

<style scoped>
.sub-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2vh;
}

.info-tags {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-tags {
  display: flex;
  justify-content: space-between;
  margin-left: 10vw;
  margin-right: 10vw;
}

.switch-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
}

.form-check {
  margin-left: 10vh;
  border-radius: 3vw;
  margin-bottom: 3vh;
}

.dropdown {
  display: flex;
  justify-content: center;
  align-items: center;
}

.location-selector {
  margin-top: 3vh;
}

.time-selector {
  margin-top: 6vh;
}
</style>
