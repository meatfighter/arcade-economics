<script setup lang="ts">
import ArcadeTable from "@/components/ArcadeTable.vue";
</script>

<template>
  <v-container>
    <div id="main-container">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
      </p>
      <p>
        Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
      </p>
      <arcade-table/>
    </div>
  </v-container>
</template>

<style scoped>
#main-container {
  max-width: 978px;
  margin: 0 auto;
}

p {
  font-size: 16px;
  line-height: 27px;
  font-weight: 300;
  text-align: left;
  font-family: 'Open Sans', sans-serif;
}
</style>