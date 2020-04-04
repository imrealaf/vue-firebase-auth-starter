<template>
  <v-card light class="elevation-4">
    <v-form v-on:submit.prevent="login">
      <v-card-text class="pa-7 pb-0">
        <v-alert v-if="error" dense outlined type="error">{{error}}</v-alert>
        <v-text-field
          outlined
          v-model="email"
          label="E-mail"
          :error-messages="emailRules"
          @blur="email.length ? $v.email.$touch() : null"
        ></v-text-field>
        <v-text-field
          v-show="email.length"
          outlined
          v-model="password"
          label="Password"
          type="password"
          :error-messages="passwordRules"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="pa-7 pt-0 justify-center">
        <v-btn type="submit" color="accent" class="px-7">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script src="./LoginForm.js"></script>
<style lang="scss" scoped>
@import 'LoginForm.scss';
</style>