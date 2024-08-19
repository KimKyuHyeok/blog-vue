<script setup>

</script>

<template>
    <div class="header">
        <div id="title"><h1>개발 공부방</h1></div>
        <div class="menuList">
            <a href="/">Home</a>
            <a href="/admin">Admin</a>
            <a href="https://github.com/kimkyuhyeok">Github</a>
        </div>
    </div>

</template>

<style scoped>

.header {
    display: flex;
    position: relative;
    width: 100%;
    box-sizing: border-box; /* 패딩과 테두리를 포함한 너비 계산 */
    margin: 0; /* 기본 margin 제거 */
    padding: 15px 10px; /* 상하 패딩 15px, 좌우 패딩 10px */
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8; /* 배경색 추가 (옵션) */
}

.menuList a {
    margin-left: 10px;
    text-decoration: none;
}

</style>
