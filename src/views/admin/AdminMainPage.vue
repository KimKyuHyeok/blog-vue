<script>
import AdminDashboard from '@/components/admin/AdminDashboard.vue'


export default {
    name: 'Home',
    components: {
        AdminDashboard
    }
}
</script>

<template>
    <div class="center-container">
        <AdminDashboard/>
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
