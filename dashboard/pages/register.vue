<template>
    <div>
        <v-card :width="400">
            <v-card-title>Register</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="register">
                    <v-text-field v-model="username" label="Username" type="text"
                        autocomplete="username" @input="message = ''"></v-text-field>
                    <v-text-field v-model="email" label="Email" type="email" autocomplete="email"></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password"
                        autocomplete="new-password"></v-text-field>
                    <v-btn type="submit">Register</v-btn>
                    Already have an account? <router-link to="/login">Login</router-link>
                    <div id="alert-container">
                        <v-alert v-if="message" type="error">{{ message }}</v-alert>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    setup() {
        const store = useUserStore();
        const isAuthenticated = computed(() => store.isAuthenticated);
        if (isAuthenticated.value) {
            this.$router.push('/')
        }
        const email = ref('');
        const username = ref('');
        const password = ref('');
        const message = ref('');
        const router = useRouter();
        const register = async () => {
            // validate values 
            if (!email.value || !username.value || !password.value) {
                message.value = 'Please fill in all fields';
                return;
            }

            email.value = email.value.trim();
            username.value = username.value.trim();
            password.value = password.value.trim();

            const response = await store.register(username.value, email.value, password.value);
            if (response === true) {
                router.push('/');
            } else {
                message.value = response.error;
            }
        }
        return { register, email, username, password, message };
    },
}
</script>

<style scoped>
#alert-container {
    margin-top: 10px;
}
</style>