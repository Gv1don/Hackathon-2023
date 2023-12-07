<template>
  <div class="reviews-container">
    <div class="head">Отзывы</div>
    <div class="comment-container">
      <div class="top-comments">
        <div class="comment author">Хамраев Иван Дилшодович</div>
        <div class="comment rating">5 звезд из 5</div>
      </div>
      <div class="bottom-comment">
        <div class="comment-text">
          Это отличный продукт! Все очень понравилось. С удовольствием снова
          куплю.
        </div>
      </div>
    </div>
    <div class="comment-container">
      <div class="top-comments">
        <div class="comment author">Анна Петрова</div>
        <div class="comment rating">4 звезды из 5</div>
      </div>
      <div class="bottom-comment">
        <div class="comment-text">
          Хороший товар, но есть небольшие недостатки. В целом, довольна
          покупкой.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommentStore } from "@/stores/commentStore";
import {onMounted, ref} from "vue";

onMounted(() => {
  // store.loadComments();
});

const store = useCommentStore();
const comments = ref([]);

// store.$subscribe(() => (comments = store.Comments));
</script>
<style>
.head {
  margin: 4%;
  font-size: 24px;
  font-weight: bold;
}

.reviews-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comment-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90vw;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 2%;
  background-color: #fff;
  margin: 2%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.top-comments {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment {
  font-size: 18px;
}

.author {
  font-weight: bold;
}

.rating {
  color: #007bff;
}

.bottom-comment {
  padding: 10px;
  border-bottom-left-radius: 10px;
}

.comment-text {
  font-size: 16px;
  color: #333;
}
</style>
