<script>
import AdminPost from '@/components/admin/PostEditor.vue'


export default {
    name: 'AdminPostPage',
    components: {
        AdminPost
    }
}
</script>

<template>
    <div class="center-container">
        <AdminPost/>
    </div>
</template>

<style scoped>
.center-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
