<template>
    <v-app-bar
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Linarc Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="150"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
              fab
              color="orange accent-2"
              bottom
              right
              absolute
            >
              <v-icon>mdi-information</v-icon>
            </v-btn>
    </v-app-bar>
</template>

<script>
  export default {
    name: 'navComp',

    data: () => ({}),
  }
</script>
