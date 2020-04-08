<template>
  <v-card light class="elevation-4">
    <v-form v-on:submit.prevent="loginWithEmail">
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
      <v-card-actions v-show="!email.length" class="social-actions pa-7 pt-0">
        <span>OR CONNECT WITH</span>
        <v-flex class="flex justify-center mt-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon class="btn-facebook" v-on="on">mdi-facebook</v-icon>
            </template>
            <span>Facebook</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon class="btn-google" v-on="on">mdi-google</v-icon>
            </template>
            <span>Google</span>
          </v-tooltip>
        </v-flex>
      </v-card-actions>
      <v-card-actions v-show="email.length" class="email-actions pa-7 pt-0 justify-center">
        <v-btn type="submit" color="black" rounded class="px-7 white--text">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script src="./LoginForm.js"></script>
<style lang="scss" scoped>
@import 'LoginForm.scss';
</style>