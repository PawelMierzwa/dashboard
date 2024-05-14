<template>
    <div class="container">
        <v-app-bar>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>My App</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text to="/">Home</v-btn>
            <v-btn text to="/about">About</v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item to="/">Home</v-list-item>
                <v-list-item to="/about">About</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <slot />
        </v-main>
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            drawer: false
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

nav {
    top: 0;
    left: 0;
    right: 0;
    background: #333;
    width: 100%;
    color: white;
    padding: 10px;
    position: fixed;
}
</style>