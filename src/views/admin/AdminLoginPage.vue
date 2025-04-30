<script>
import AdminPassword from '@/components/admin/AdminPassword.vue'


export default {
    name: 'Home',
    components: {
        AdminPassword
    }
}
</script>

<template>
    <div class="center-container">
        <AdminPassword/>
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
