<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="auto" class="px-0 pt-5 pb-0 py-sm-5">
        <v-img
            src="@/assets/insert-coin.svg"
            min-width="100px"
            max-width="100px"
            alt="Insert Coin"
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
            </div>
          </template>
        </v-img>
      </v-col>
      <v-col class="px-5 py-0">
        <div class="text-h4 text-xl-h3 text-lg-h3 text-md-h3 mb-md-2">Retro Gaming, Modern Money</div>
        <div class="text-h6 text-xl-h5 text-lg-h5 text-md-h5 hidden-xs">How Much Would That Quarter Cost You Today?</div>
      </v-col>
    </v-row>
    <v-row>
      <div class="text-h6 d-sm-none my-2">How Much Would That Quarter Cost You Today?</div>
    </v-row>
  </v-container>
</template>