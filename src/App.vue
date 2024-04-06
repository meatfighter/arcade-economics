<template>
  <v-app>
    <v-main>
      <v-sheet max-width="978px" class="mx-auto">
        <router-view />
      </v-sheet>
    </v-main>
  </v-app>
</template>

<style>
a,a:visited {
  color: #58A6FF;
  text-decoration: none;
  white-space: nowrap;
}

a:hover,a:active {
  color: #58A6FF;
  text-decoration: underline;
  white-space: nowrap;
}
</style>
