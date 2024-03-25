<template>
  <v-app>
    <v-main>
      <div id="centered">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
#centered {
  max-width: 978px;
  margin: 0 auto;
}
</style>
