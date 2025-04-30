<script>
import MainHeader from '@/components/MainHeader.vue'
import SideMenu from '@/components/SideMenu.vue'
import PostDetail from '@/components/PostDetail.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
    name: 'Home',
    components: {
        MainHeader,
        SideMenu,
        PostDetail,
        SearchBar
    }
}
</script>

<template>
    <MainHeader/>
    <div class="content-layout">
        <div class="side-layout">
            <SearchBar/>
            <SideMenu/>
        </div>
        <PostDetail/>
    </div>
</template>

<style scoped>
.content-layout {
    display: flex;
    max-width: 1600px;
    margin: 1 auto;
    padding: 40px;
    gap: 40px;
}

.side-layout {
    display: flex;
    flex-direction: column;
}
</style>
