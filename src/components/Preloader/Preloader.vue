<template>
  <v-fade-transition>
    <div v-show="show" class="preloader" :class="color">
      <div class="preloader__content">
        <slot></slot>
      </div>
    </div>
  </v-fade-transition>
</template>

<script src="./Preloader.js"></script>
<style lang="scss" scoped>
@import 'Preloader.scss';
</style>