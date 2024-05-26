<template>
    <div class="container">
        <v-app-bar>
            <v-app-bar-nav-icon v-if="isAuthenticated" id="nav-burger" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title><nuxt-link to="/">Dashboard App</nuxt-link></v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="isAuthenticated">
                <v-btn text to="/">Home</v-btn>
                <v-btn text to="/about">About</v-btn>
            </div>
            <v-menu v-if="isAuthenticated" :location="'bottom'" transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                    <v-btn v-if="user" v-bind="props" style="margin-right: 10px;">
                        {{  user.username }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item to="/profile" class="nav-dropdown-list-item">Profile</v-list-item>
                    <v-list-item to="/settings" class="nav-dropdown-list-item">Settings</v-list-item>
                    <v-list-item @click="logout" class="nav-dropdown-list-item">Logout</v-list-item>
                </v-list>
            </v-menu>
            <v-btn text v-else to="/login">Login</v-btn>
        </v-app-bar>
        <v-navigation-drawer v-if="isAuthenticated" v-model="drawer">
            <v-list>
                <v-list-item to="/">Home</v-list-item>
                <v-list-item to="/about">About</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <div v-if="!isLoaded"><h1>Loading...</h1></div>
            <slot v-else />
        </v-main>
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout',
    setup() {
        const store = useUserStore();
        const router = useRouter();
        const isAuthenticated = computed(() => store.isAuthenticated);
        const isLoaded = computed(() => store.isLoaded);
        const user = computed(() => store.getUser);
        if (process.client) {
            useAsyncData('user', async () => {
                const user = await store.fetchUser()
                return user
            })
        }
        const logout = async () => {
            await store.logout();
            router.push('/login');
        }
        return { isAuthenticated, isLoaded, user, logout };
    },
    data() {
        return {
            drawer: false
        }
    },
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

.v-btn {
    margin-right: 10px;
}

.nav-dropdown-list-item {
    cursor: pointer;
    text-align: center;
}

#nav-burger {
    margin-left: 10px;
}

a {
    color: white;
    text-decoration: none;
}
</style>