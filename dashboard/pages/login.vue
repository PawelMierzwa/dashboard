<template>
    <div>
        <v-card :width="400">
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="login">
                    <v-text-field v-model="username" label="Username" type="text"
                        autocomplete="username"></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password"
                        autocomplete="current-password"></v-text-field>
                    <v-btn type="submit">Login</v-btn>
                    Don't have an account? <router-link to="/register">Register</router-link>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
const router = useRouter();
const store = useUserStore();
const isAuthenticated = computed(() => store.isAuthenticated);

if (isAuthenticated.value) {
    router.push('/')
}

const username = ref('');
const password = ref('');

const login = async () => {
    const response = await store.login(username.value, password.value);
    if (response === true) {;
        router.push('/');
    } else {
        message.value = response.error;
    }
}
</script>