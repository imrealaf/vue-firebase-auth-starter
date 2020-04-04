<template>
  <v-container class="fill-height justify-center">
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm/LoginForm.vue';

export default {
  components: {
    LoginForm
  }
};
</script>

