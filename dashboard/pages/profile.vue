<template>
    <div>
        <h1>User Profile</h1>
        <div id="profile-row-container">
            <div id="profile-information-container">
                <table class="profile-information-table">
                    <tr>
                        <td class="profile-information-label">Username</td>
                        <td class="profile-information-text">{{ user.username }}</td>
                    </tr>
                    <tr>
                        <td class="profile-information-label">Email</td>
                        <td class="profile-information-text">{{ user.email }}</td>
                    </tr>
                </table>
            </div>
            <div id="profile-additional-container">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profile',
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
        return { isAuthenticated, isLoaded, user };
    },
}
</script>

<style scoped>
#profile-row-container {
    display: flex;
    flex-direction: row;
    width: 100%;
}

#profile-information-container {
    display: block;
    width: 40%;
}

#profile-additional-container {
    width: 60%;
}

.profile-information-table td {
    min-width: 200px;
    padding: 10px 0 10px 0;
    font-size: 18px;
}
</style>