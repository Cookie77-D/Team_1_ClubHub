<script setup lang="ts">
  import Icon from './components/icon.vue'
  function iconClicked() {
    //Future implementation will direct user back to homepage when CH logo is clicked
    
  }
  const links = [
    'Home',
    'About Us',
    'Team',
    'Services',
    'Contact Us',
  ]
</script>

<template>
    <v-app>
        <!-- App bar displayed at the top of the page -->
        <v-app-bar :elevation="6" color=#B2B2B2>
            <template v-slot:prepend>
                <v-icon icon = "$chLogo" size=65 @click="iconClicked"/>
            </template>
            <v-divider :thickness="5" class="mx3" inset vertical />

            <v-app-bar-title class="text-h4 font-weight-bold">ClubHub</v-app-bar-title>

            <template v-slot:append>
                <v-btn append-icon="mdi-account">Login</v-btn>

                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-app-bar>
        <h1>Login Page!</h1>
    </v-app>
</template>