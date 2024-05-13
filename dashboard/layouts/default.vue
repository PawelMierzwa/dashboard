<template>
    <div class="container">
        <nav>
            <header>
                <h1>Dashboard</h1>
            </header>
            <router-link to="/dashboard/a">A</router-link>
            <router-link to="/dashboard/b">B</router-link>
            <router-link to="/dashboard/c">C</router-link>
            <router-link to="/dashboard/d">D</router-link>
            <router-view></router-view>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout',
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