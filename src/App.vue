SETUP SCRIPT FOR IMPORTS, FUNCTION DECLARATION, GLOBAL VARIABLES, ETC
<script setup lang="ts">
  import Icon from './components/icon.vue'
</script>


MAIN PAGE STRUCTURE BEGINS HERE
<template>
  <v-app>
    <v-app-bar :elevation="6" color=#B2B2B2>
      <template v-slot:prepend>
        <v-icon icon = "$chLogo" size=65 />
      </template>

      <v-app-bar-title class="text-h4">ClubHub</v-app-bar-title>

      <template v-slot:append>
        <v-btn append-icon="mdi-account">Login</v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-card
              color="surface-variant"
              image= src/assets/homepageBG.png
              height="500"
            >
            <v-card-title>
                <div class="text-center">
                  <h1>Welcome to Clubhub</h1>
                  <h4>Your club management solution</h4>
                </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                class="mt-auto"
                append-icon="mdi-chevron-right"
                color="blue-lighten-2"
                text="Register"
                variant="outlined"
                block
                ></v-btn>
            </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
