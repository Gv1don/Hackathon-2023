<template>
  <div class="alert-container">
    <p>
      Вы в режиме выбора точки для создания. Кликните на карте, где хотите
      отметить точку.
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.alert-container {
  position: absolute;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
  color: white;
  text-shadow: black;
  border-radius: 20px;
  width: 95vw;
  height: 7vh;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 2%;
  transform: translate(-50%, -2%);
  background-color: rgba(255, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

p {
  margin: 10px;
}
</style>
