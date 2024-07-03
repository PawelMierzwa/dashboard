<template>
    <div>
        <h1>Settings</h1>
        <div id="settings-subpage-switcher">
            <NuxtLink class="switcher-button" to="/settings/">Notifications</NuxtLink>
            <NuxtLink class="switcher-button" to="/settings/security">Security</NuxtLink>
            <NuxtLink class="switcher-button" to="/settings/appearance">Appearance</NuxtLink>
        </div>
        <div id="settings-subpage"> 
            <NuxtPage/>
        </div>
    </div>
</template>

<style scoped>
#settings-subpage {
    margin-top: 40px;
}

#settings-subpage-switcher {
    display: flex;
    border-bottom: 1px solid grey;
}

.switcher-button {
    padding: 10px 20px 10px 20px;
    color: grey;
    text-decoration: none;
    border-bottom: 1px solid grey;
}

.router-link-exact-active {
    color: white;
    border-bottom: 1px solid white;
}

h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
}


</style>