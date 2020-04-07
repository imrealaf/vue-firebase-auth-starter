<template>
  <header>
    <v-navigation-drawer
      v-model="menuIsOpen"
      :mini-variant="menuIsMini"
      :clipped="clipped"
      :fixed="fixed"
      v-click-outside="onClickOutside"
      app
    >
      <v-list v-if="navItems.length" class="pt-0">
        <v-list-item v-for="(item, i) in navItems" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app :color="bgColor" :flat="isFlat">
      <v-app-bar-nav-icon @click.stop="toggleMenu" v-show="!menuIsOpen" />
      <v-btn icon @click.stop="toggleMenu" v-show="menuIsOpen">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn @click.stop="toggleMiniMenu" v-show="menuIsOpen && !isMobileMenu" small text>
        <v-icon>mdi-{{ `chevron-${menuIsMini ? 'right' : 'left'}` }}</v-icon>
        {{ `${menuIsMini ? 'Expand' : 'Collapse'}` }} Menu
      </v-btn>
      <v-flex class="header-logo title align-center mb-5">
        <v-icon large>mdi-firebase</v-icon>
        <span class="ml-2">
          <strong>Vue Firebase Auth</strong>
        </span>
      </v-flex>

      <v-spacer />

      <v-toolbar-items v-if="user">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text class="text-capitalize body-2">
              <v-img
                class="mr-3"
                :src="user.photo || require('../../assets/images/default-profile.png')"
                height="40"
                width="40"
              />
              {{user.displayName}}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list class="py-0 seconday--font profile-menu">
            <v-list-item-group color style="width:100%">
              <v-list-item to="/account" link>
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-account-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Account Details</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </header>
</template>

<script src="./Header.js"></script>
<style lang="scss" scoped>
@import 'Header.scss';
</style>