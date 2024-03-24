<script setup lang="ts">
import ArcadeTable from "@/components/ArcadeTable.vue";
</script>

<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-col cols="12" md="8" lg="6" xl="6" xxl="4">

          <v-container>
            <v-row>


<!--              <v-container>-->
<!--                <v-row no-gutters>-->
<!--                  <v-col justify="start" align-self="start" cols="2">-->
<!--                    <v-img src="@/assets/insert-coin.svg" min-width="100px" max-width="100px" alt="Insert Coin"></v-img>-->
<!--                  </v-col>-->
<!--                  <v-col justify="center" align-self="center" cols="10">-->
<!--                    <v-sheet>Retro Gaming, Modern Money</v-sheet>-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--              </v-container>-->
              <!--            <v-row no-gutters>-->
              <!--              How Much Would That Quarter Cost You Today?-->
              <!--            </v-row>-->

              <v-card variant="flat">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-avatar class="ma-3" rounded="0" size="125">
                    <v-img src="@/assets/insert-coin.svg" min-width="100px" max-width="100px" alt="Insert Coin"></v-img>
                  </v-avatar>
                  <div>
                    <v-card-title>Retro Gaming, Modern Money</v-card-title>
                    <v-card-subtitle>How Much Would That Quarter Cost You Today?</v-card-subtitle>
                  </div>
                </div>
              </v-card>


            </v-row>

            <v-row no-gutters>
              <arcade-table/>
            </v-row>
          </v-container>

        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>