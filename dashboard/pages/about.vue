<template>
    <div>
        <h1>About</h1>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',
    head() {
        return {
            title: 'About Page'
        }
    },
    metaInfo() {
        return {
            title: 'About Page',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'This is the about page'
                }
            ]
        }
    },
    data() {
        return {
            message: 'Hello from the about page'
        }
    }
}
</script>