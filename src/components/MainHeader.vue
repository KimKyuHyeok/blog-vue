<template>
    <header id="header">
        <div class="logo" @click="goToMainPage">DevKyu96</div>

        <a class="admin-link" href="/admin">admin</a>
    </header>
    
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()

const goToMainPage = () => {
    router.push({ path: '/' })
}
</script>


<style scoped>
#header {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
}

.logo {
    font-size: 30px;
    margin-left: 200px;
    cursor: pointer;
}

.admin-link {
    text-decoration: none;
    color: darkgray;
    margin-right: 200px;
}

</style>