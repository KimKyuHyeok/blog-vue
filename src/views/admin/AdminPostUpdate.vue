<script>
import AdminPostUpdateEditor from '@/components/admin/PostEditorUpdate.vue'


export default {
    name: 'AdminPostUpdate',
    components: {
        AdminPostUpdateEditor
    }
}
</script>

<template>
    <div class="center-container">
        <AdminPostUpdateEditor/>
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
