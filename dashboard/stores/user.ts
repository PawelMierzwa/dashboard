interface User {
    id: string;
    name: string;
    password?: string;
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null as User | null,
        loaded: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        isLoaded: (state) => state.loaded,
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
                this.loaded = true;
                return;
            }
            // if status is 200, we have a user
            // @ts-ignore
            this.setUser(res.user as User);
            this.loaded = true;
            return;
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
            // if status is 200, we have a user
            // @ts-ignore
            this.setUser(res.user as User);
            return true;
        },
        async register(username: string, email: string, password: string) {
            const res = await $fetch('/api/user/register', {
                method: 'POST',
                body: JSON.stringify({ username: username, email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (res.status !== 201) {
                console.log(res);
                return {
                    error: res.message,
                };
            }
            // @ts-expect-error
            this.setUser(res.user);
            return true;
        },
        async logout() {
            const res = await $fetch('/api/user/logout');
            if (res.status !== 200) {
                console.log(res);
                return;
            }
            this.setUser(null as any);
        },
    },
});