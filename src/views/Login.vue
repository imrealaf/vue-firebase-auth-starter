<template>
  <v-container class="fill-height justify-center">
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <v-flex class="headline align-center mb-5">
          <v-icon large>mdi-firebase</v-icon>
          <span class="ml-2">
            <strong>Vue Firebase Auth</strong>
          </span>
        </v-flex>
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

<style lang="scss" scoped>
</style>

