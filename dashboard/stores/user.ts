interface User {
    id: string;
    name: string;
    password?: string;
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null as User | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        setUser(user: User) {
            this.user = user;
        },
        async fetchUser() {
            const res = await $fetch('/api/user');
            if (res.status !== 200) {
                console.log(res);
                this.setUser(null as any);
                return;
            }
            // if status is 200, we have a user
            // @ts-ignore
            this.setUser(res.user as User);
        },
        async login(username: string, password: string) {
            const res = await $fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (res.status !== 200) {
                return { error: res.message };
            }
            // @ts-ignore
            this.setUser(res.user as User);
            return true;
        },
    },
});